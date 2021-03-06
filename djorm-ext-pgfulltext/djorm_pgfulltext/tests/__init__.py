# -*- coding: utf-8 -*-

import django
from django.db import transaction
from django.utils.unittest import TestCase

from djorm_pgfulltext.tests.models import Book
from djorm_pgfulltext.tests.models import Person
from djorm_pgfulltext.tests.models import Person2
from djorm_pgfulltext.tests.models import Person3
from djorm_pgfulltext.tests.models import Person4
from djorm_pgfulltext.tests.models import Person5


class FtsSetUpMixin:
    def setUp(self):
        Person.objects.all().delete()

        self.p1 = Person.objects.create(
            name=u"Andréi", description=u"Python programmer"
        )
        self.p2 = Person.objects.create(name=u"Pèpâ", description=u"Is a housewife")


class TestFts(FtsSetUpMixin, TestCase):
    def test_self_update_index(self):
        obj = Person2.objects.create(name=u"Pepa", description=u"Is a housewife")
        obj.update_search_field(using="default")

        qs = Person2.objects.search(query="Pepa")
        self.assertEqual(qs.count(), 1)
        qs = Person2.objects.search(query=u"Pèpâ")
        self.assertEqual(qs.count(), 1)

    def test_self_automatic_update_index(self):
        obj = Person3(name=u"Pèpâ", description=u"Is a housewife")

        obj.save()

        qs = Person3.objects.search(query="Pepa")
        self.assertEqual(qs.count(), 1)

        obj.name = "Andrei"
        obj.save()

        qs = Person3.objects.search(query="Pepa")
        self.assertEqual(qs.count(), 0)

    def test_search_and(self):
        qs1 = Person.objects.search(query="programmer", raw=True)
        qs2 = Person.objects.search(query="Andrei", raw=True)

        self.assertEqual(qs1.count(), 1)
        self.assertEqual(qs2.count(), 1)

    def test_search_and_2(self):
        qs1 = Person.objects.search(query="Andrei & programmer", raw=True)
        qs2 = Person.objects.search(query="Pepa & housewife", raw=True)
        qs3 = Person.objects.search(query="Pepa & programmer", raw=True)

        self.assertEqual(qs1.count(), 1)
        self.assertEqual(qs2.count(), 1)
        self.assertEqual(qs3.count(), 0)

    def test_search_with_fields_params(self):
        qs1 = Person.objects.search(
            query="Andrei & programmer", raw=True, fields=["name"]
        )
        qs2 = Person.objects.search(
            query="Andrei & programmer", raw=True, fields=["name", "description"]
        )

        self.assertEqual(qs1.count(), 0)
        self.assertEqual(qs2.count(), 1)

    def test_search_or(self):
        qs1 = Person.objects.search(query=u"Andrei | Pepa", raw=True)
        qs2 = Person.objects.search(query=u"Andrei | Pepo", raw=True)
        qs3 = Person.objects.search(query=u"Pèpâ | Andrei", raw=True)
        qs4 = Person.objects.search(query=u"Pepo | Francisco", raw=True)

        self.assertEqual(qs1.count(), 2)
        self.assertEqual(qs2.count(), 1)
        self.assertEqual(qs3.count(), 2)
        self.assertEqual(qs4.count(), 0)

    def test_update_indexes(self):
        self.p1.name = "Francisco"
        self.p1.save()

        qs = Person.objects.search(query="Pepo | Francisco", raw=True)
        self.assertEqual(qs.count(), 1)

    def test_transaction_test(self):
        if not hasattr(transaction, "atomic"):
            return

        with transaction.atomic():
            obj = Person2.objects.create(name=u"Pepa", description=u"Is a housewife")

            obj.update_search_field(using="default")

        qs = Person2.objects.search(query="Pepa")
        self.assertEqual(qs.count(), 2)

    def test_ranking_with_join(self):
        book = Book.objects.create(name="Learning Python", author=self.p1)

        qs = Book.objects.search(
            query="Learning Python", rank_field="rank"
        ).select_related("author")

        self.assertEqual(qs[0].author, self.p1)

    def test_headline(self):
        book = Book.objects.create(name="Learning Python", author=self.p1)

        qs = Book.objects.search(
            query="Python", headline_field="headline", headline_document="name"
        )

        self.assertEqual(qs[0].headline, "Learning <b>Python</b>")

    def test_multi_vector_field(self):
        Person4.objects.create(
            name=u"Pepa",
            description=u"Is a housewife",
            data=u'{"%s": "indexed", "not_indexed": "trash"}' % Person4.INDEXED_KEY,
        )

        qs = Person4.objects.filter(search_index__ft_startswith="housewife")
        self.assertEqual(qs.count(), 1)

        qs = Person4.objects.filter(data_search_index__ft_startswith="indexed")
        self.assertEqual(qs.count(), 1)

        qs = Person4.objects.filter(data_search_index__ft_startswith="trash")
        self.assertEqual(qs.count(), 0)

    def test_empty_search_index(self):
        Person5.objects.create(name="Pepa", description="Is a housewife")

        self.assertEqual(Person5.objects.all().count(), 1)


class TestFullTextLookups(FtsSetUpMixin, TestCase):
    def skipUnlessDjango17(self):
        if django.VERSION < (1, 7):
            self.skipTest("Requires Django>=1.7")

    def setUp(self):
        self.skipUnlessDjango17()
        super(TestFullTextLookups, self).setUp()

    def test_full_text_lookups(self):
        self.assertEquals(
            self.p1.pk,
            Person.objects.filter(search_index__ft_startswith="programmer")[0].pk,
        )

    def test_user_input(self):
        for test_str in [
            "())(#*&|||)()( )( ) )( )(|| | | |&",
            "test test",
            "test !test",
            "test & test",
            "test | test",
            "test (test)",
            "test(",
            "test       &&&& test",
            "\\'test",
        ]:
            list(Person.objects.filter(search_index__ft_startswith=test_str))

    def test_user_input_utf8(self):
        for test_str in ["łódź"]:
            list(Person.objects.filter(search_index__ft_startswith=test_str))

    def test_alternative_config(self):
        from djorm_pgfulltext.fields import TSConfig

        pq = Person.objects.filter(
            search_index__ft_startswith=[TSConfig("names"), "progra"]
        )
        p = pq[0]

        self.assertEquals(p.pk, self.p1.pk)

        # make sure it is preserved after re-query
        self.assertEquals(pq.all()[0].pk, self.p1.pk)

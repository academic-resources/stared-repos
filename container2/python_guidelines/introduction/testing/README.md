# Testing

## [`unittest`](https://docs.python.org/3/library/unittest.html)

The built-in `unittest` module provides a rich set of tools for constructing and running tests. It supports test automation, sharing of setup and shutdown code for tests, aggregation of tests into collections, and independence of tests from the reporting framework.

To achieve this, `unittest` supports some importan concepts in an objet-oriented way:

* test fixture
* test case
* test suite
* test runner

## [`doctest`](https://docs.python.org/3/library/doctest.html#module-doctest)

Doctest module searches for pieces of text that look like interactive Python sessions, and then executes those sessions to verify that tey work exactly as shown.

#### Common ussages

* Check that a module's docstring are up-to-date by verifying that all interactive examples still work as documented.
* To perform regression testing by verifying that interactive examples from a test file or a test object work as expected.
* To write tutorial documentation, liberally illustrated with input-output examples.

## [pytest framework](https://docs.pytest.org/en/latest/)
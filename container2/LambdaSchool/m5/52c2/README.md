# Java Reading Orders

A student that completes this project shows that they can:

* Perform CRUD operations on an RDBMS using JPA and Hibernate (reading)
* Implement seed data using SQL statements
* Explain and use Spring Data Relationships
* Use the JsonIgnoreProperties annotation to prevent infinite loops

## Introduction

This is a basic database scheme with customers, orders, and sales agents. This Java Spring REST API application will provide endpoints for clients to read various data sets contained in the application's data.

### Database layout

The table layouts are as follows

![Image of Database Layout](java-orders-db.png)

* AGENTS
  * AGENTCODE primary key, not null Long
  * AGENTNAME string
  * WORKINGAREA string
  * COMMISSION double
  * PHONE string
  * COUNTRY string

* CUSTOMERS
  * CUSTCODE primary key, not null Long
  * CUSTNAME String, not null
  * CUSTCITY String
  * WORKINGAREA String
  * CUSTCOUNTRY String
  * GRADE String
  * OPENINGAMT double
  * RECEIVEAMT double
  * PAYMENTAMT double
  * OUTSTANDINGAMT double
  * PHONE String
  * AGENTCODE Long foreign key (one agent to many customers) not null

* ORDERS
  * ORDNUM primary key, not null Long
  * ORDAMOUNT double
  * ADVANCEAMOUNT double
  * CUSTCODE Long foreign key (one customer to many orders) not null
  * ORDERDESCRIPTION String

* PAYMENTS
  * PAYMENTID primary key, not null long
  * TYPE String not null
  
* ORDERSPAYMENTS (join table)
  * ORDERNUM foreign key to ORDERS
  * PAYMENTID foreign key to PAYMENTS.

* Customers has a foreign key to Agents (AGENTCODE) this means:
  * Customers has a Many to One relationship to Agents and
  * Agents has a One to Many relationship to Customers

* Orders has a foreign key to Customers (CUSTCODE)
  * Orders has a Many to One relationship to Customers and
  * Customers has a One to Many relationship to Orders

* Orders has a many to many relationship with payments
  * multiple orders can use the same payment type and an order can have multiple payment types.
  * For example you can use both gift card and credit card to pay for an order.

Using the provided seed data, a successful application will return the follow data based on the given endpoint. Expand the section of the endpoint to see the data that is returned.

### MVP

<details>
<summary>http://localhost:2019/customers/orders</summary>

```JSON
[
    {
        "custcode": 1,
        "custname": "Holmes",
        "custcity": "London",
        "workingarea": "London",
        "custcountry": "UK",
        "grade": "2",
        "openingamt": 6000.0,
        "receiveamt": 5000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 4000.0,
        "phone": "BBBBBBB",
        "agent": {
            "agentcode": 3,
            "agentname": "Alford",
            "workingarea": "New York",
            "commission": 0.12,
            "phone": "044-25874365",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 2,
        "custname": "Micheal",
        "custcity": "New York",
        "workingarea": "New York",
        "custcountry": "USA",
        "grade": "2",
        "openingamt": 3000.0,
        "receiveamt": 5000.0,
        "paymentamt": 2000.0,
        "outstandingamt": 6000.0,
        "phone": "CCCCCCC",
        "agent": {
            "agentcode": 8,
            "agentname": "Subbarao",
            "workingarea": "Bangalore",
            "commission": 0.14,
            "phone": "077-12346674",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 7,
                "ordamount": 3500.0,
                "advanceamount": 2000.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 4,
                        "type": "Mobile Pay"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 3,
        "custname": "Albert",
        "custcity": "New York",
        "workingarea": "New York",
        "custcountry": "USA",
        "grade": "3",
        "openingamt": 5000.0,
        "receiveamt": 7000.0,
        "paymentamt": 6000.0,
        "outstandingamt": 6000.0,
        "phone": "BBBBSBB",
        "agent": {
            "agentcode": 8,
            "agentname": "Subbarao",
            "workingarea": "Bangalore",
            "commission": 0.14,
            "phone": "077-12346674",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 8,
                "ordamount": 2500.0,
                "advanceamount": 400.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 1,
                        "type": "Cash"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 4,
        "custname": "Ravindran",
        "custcity": "Bangalore",
        "workingarea": "Bangalore",
        "custcountry": "India",
        "grade": "2",
        "openingamt": 5000.0,
        "receiveamt": 7000.0,
        "paymentamt": 4000.0,
        "outstandingamt": 8000.0,
        "phone": "AVAVAVA",
        "agent": {
            "agentcode": 11,
            "agentname": "Ivan",
            "workingarea": "Torento",
            "commission": 0.15,
            "phone": "008-22544166",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 5,
        "custname": "Cook",
        "custcity": "London",
        "workingarea": "London",
        "custcountry": "UK",
        "grade": "2",
        "openingamt": 4000.0,
        "receiveamt": 9000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 6000.0,
        "phone": "FSDDSDF",
        "agent": {
            "agentcode": 6,
            "agentname": "Lucida",
            "workingarea": "San Jose",
            "commission": 0.12,
            "phone": "044-52981425",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 6,
        "custname": "Stuart",
        "custcity": "London",
        "workingarea": "London",
        "custcountry": "UK",
        "grade": "1",
        "openingamt": 6000.0,
        "receiveamt": 8000.0,
        "paymentamt": 3000.0,
        "outstandingamt": 11000.0,
        "phone": "GFSGERS",
        "agent": {
            "agentcode": 3,
            "agentname": "Alford",
            "workingarea": "New York",
            "commission": 0.12,
            "phone": "044-25874365",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 7,
        "custname": "Bolt",
        "custcity": "New York",
        "workingarea": "New York",
        "custcountry": "USA",
        "grade": "3",
        "openingamt": 5000.0,
        "receiveamt": 7000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 3000.0,
        "phone": "DDNRDRH",
        "agent": {
            "agentcode": 8,
            "agentname": "Subbarao",
            "workingarea": "Bangalore",
            "commission": 0.14,
            "phone": "077-12346674",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 3,
                "ordamount": 4500.0,
                "advanceamount": 900.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 3,
                        "type": "Credit Card"
                    },
                    {
                        "paymentid": 2,
                        "type": "Gift Card"
                    }
                ]
            },
            {
                "ordnum": 10,
                "ordamount": 4000.0,
                "advanceamount": 700.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 4,
                        "type": "Mobile Pay"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 8,
        "custname": "Fleming",
        "custcity": "Brisban",
        "workingarea": "Brisban",
        "custcountry": "Australia",
        "grade": "2",
        "openingamt": 7000.0,
        "receiveamt": 7000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 5000.0,
        "phone": "NHBGVFC",
        "agent": {
            "agentcode": 5,
            "agentname": "Santakumar",
            "workingarea": "Chennai",
            "commission": 0.14,
            "phone": "007-22388644",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 11,
                "ordamount": 1500.0,
                "advanceamount": 600.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 2,
                        "type": "Gift Card"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 9,
        "custname": "Jacks",
        "custcity": "Brisban",
        "workingarea": "Brisban",
        "custcountry": "Australia",
        "grade": "1",
        "openingamt": 7000.0,
        "receiveamt": 7000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 7000.0,
        "phone": "WERTGDF",
        "agent": {
            "agentcode": 5,
            "agentname": "Santakumar",
            "workingarea": "Chennai",
            "commission": 0.14,
            "phone": "007-22388644",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 10,
        "custname": "Yearannaidu",
        "custcity": "Chennai",
        "workingarea": "Chennai",
        "custcountry": "India",
        "grade": "1",
        "openingamt": 8000.0,
        "receiveamt": 7000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 8000.0,
        "phone": "ZZZZBFV",
        "agent": {
            "agentcode": 10,
            "agentname": "McDen",
            "workingarea": "London",
            "commission": 0.15,
            "phone": "078-22255588",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 11,
        "custname": "Sasikant",
        "custcity": "Mumbai",
        "workingarea": "Mumbai",
        "custcountry": "India",
        "grade": "1",
        "openingamt": 7000.0,
        "receiveamt": 11000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 11000.0,
        "phone": "147-25896312",
        "agent": {
            "agentcode": 2,
            "agentname": "Alex",
            "workingarea": "London",
            "commission": 0.13,
            "phone": "075-12458969",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 12,
        "custname": "Ramanathan",
        "custcity": "Chennai",
        "workingarea": "Chennai",
        "custcountry": "India",
        "grade": "1",
        "openingamt": 7000.0,
        "receiveamt": 11000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 9000.0,
        "phone": "GHRDWSD",
        "agent": {
            "agentcode": 10,
            "agentname": "McDen",
            "workingarea": "London",
            "commission": 0.15,
            "phone": "078-22255588",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 6,
                "ordamount": 2000.0,
                "advanceamount": 0.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 3,
                        "type": "Credit Card"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 13,
        "custname": "Avinash",
        "custcity": "Mumbai",
        "workingarea": "Mumbai",
        "custcountry": "India",
        "grade": "2",
        "openingamt": 7000.0,
        "receiveamt": 11000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 9000.0,
        "phone": "113-12345678",
        "agent": {
            "agentcode": 2,
            "agentname": "Alex",
            "workingarea": "London",
            "commission": 0.13,
            "phone": "075-12458969",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 1,
                "ordamount": 1000.0,
                "advanceamount": 600.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 1,
                        "type": "Cash"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 14,
        "custname": "Winston",
        "custcity": "Brisban",
        "workingarea": "Brisban",
        "custcountry": "Australia",
        "grade": "1",
        "openingamt": 5000.0,
        "receiveamt": 8000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 6000.0,
        "phone": "AAAAAAA",
        "agent": {
            "agentcode": 5,
            "agentname": "Santakumar",
            "workingarea": "Chennai",
            "commission": 0.14,
            "phone": "007-22388644",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 15,
        "custname": "Karl",
        "custcity": "London",
        "workingarea": "London",
        "custcountry": "UK",
        "grade": "0",
        "openingamt": 4000.0,
        "receiveamt": 6000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 3000.0,
        "phone": "AAAABAA",
        "agent": {
            "agentcode": 6,
            "agentname": "Lucida",
            "workingarea": "San Jose",
            "commission": 0.12,
            "phone": "044-52981425",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 16,
        "custname": "Shilton",
        "custcity": "Torento",
        "workingarea": "Torento",
        "custcountry": "Canada",
        "grade": "1",
        "openingamt": 10000.0,
        "receiveamt": 7000.0,
        "paymentamt": 6000.0,
        "outstandingamt": 11000.0,
        "phone": "DDDDDDD",
        "agent": {
            "agentcode": 4,
            "agentname": "Ravi",
            "workingarea": "Bangalore",
            "commission": 0.15,
            "phone": "077-45625874",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 4,
                "ordamount": 2000.0,
                "advanceamount": 0.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 4,
                        "type": "Mobile Pay"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 17,
        "custname": "Charles",
        "custcity": "Hampshair",
        "workingarea": "Hampshair",
        "custcountry": "UK",
        "grade": "3",
        "openingamt": 6000.0,
        "receiveamt": 4000.0,
        "paymentamt": 5000.0,
        "outstandingamt": 5000.0,
        "phone": "MMMMMMM",
        "agent": {
            "agentcode": 9,
            "agentname": "Mukesh",
            "workingarea": "Mumbai",
            "commission": 0.11,
            "phone": "029-12358964",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 18,
        "custname": "Srinivas",
        "custcity": "Bangalore",
        "workingarea": "Bangalore",
        "custcountry": "India",
        "grade": "2",
        "openingamt": 8000.0,
        "receiveamt": 4000.0,
        "paymentamt": 3000.0,
        "outstandingamt": 9000.0,
        "phone": "AAAAAAB",
        "agent": {
            "agentcode": 7,
            "agentname": "Anderson",
            "workingarea": "Brisban",
            "commission": 0.13,
            "phone": "045-21447739",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 19,
        "custname": "Steven",
        "custcity": "San Jose",
        "workingarea": "San Jose",
        "custcountry": "USA",
        "grade": "1",
        "openingamt": 5000.0,
        "receiveamt": 7000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 3000.0,
        "phone": "KRFYGJK",
        "agent": {
            "agentcode": 10,
            "agentname": "McDen",
            "workingarea": "London",
            "commission": 0.15,
            "phone": "078-22255588",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 2,
                "ordamount": 3000.0,
                "advanceamount": 500.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 2,
                        "type": "Gift Card"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 20,
        "custname": "Karolina",
        "custcity": "Torento",
        "workingarea": "Torento",
        "custcountry": "Canada",
        "grade": "1",
        "openingamt": 7000.0,
        "receiveamt": 7000.0,
        "paymentamt": 9000.0,
        "outstandingamt": 5000.0,
        "phone": "HJKORED",
        "agent": {
            "agentcode": 4,
            "agentname": "Ravi",
            "workingarea": "Bangalore",
            "commission": 0.15,
            "phone": "077-45625874",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 21,
        "custname": "Martin",
        "custcity": "Torento",
        "workingarea": "Torento",
        "custcountry": "Canada",
        "grade": "2",
        "openingamt": 8000.0,
        "receiveamt": 7000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 8000.0,
        "phone": "MJYURFD",
        "agent": {
            "agentcode": 4,
            "agentname": "Ravi",
            "workingarea": "Bangalore",
            "commission": 0.15,
            "phone": "077-45625874",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 22,
        "custname": "Ramesh",
        "custcity": "Mumbai",
        "workingarea": "Mumbai",
        "custcountry": "India",
        "grade": "3",
        "openingamt": 8000.0,
        "receiveamt": 7000.0,
        "paymentamt": 3000.0,
        "outstandingamt": 12000.0,
        "phone": "Phone No",
        "agent": {
            "agentcode": 2,
            "agentname": "Alex",
            "workingarea": "London",
            "commission": 0.13,
            "phone": "075-12458969",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 5,
                "ordamount": 4000.0,
                "advanceamount": 600.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 2,
                        "type": "Gift Card"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 23,
        "custname": "Rangarappa",
        "custcity": "Bangalore",
        "workingarea": "Bangalore",
        "custcountry": "India",
        "grade": "2",
        "openingamt": 8000.0,
        "receiveamt": 11000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 12000.0,
        "phone": "AAAATGF",
        "agent": {
            "agentcode": 1,
            "agentname": "Ramasundar",
            "workingarea": "Bangalore",
            "commission": 0.15,
            "phone": "077-25814763",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 9,
                "ordamount": 500.0,
                "advanceamount": 0.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 3,
                        "type": "Credit Card"
                    }
                ]
            }
        ]
    },
    {
        "custcode": 24,
        "custname": "Venkatpati",
        "custcity": "Bangalore",
        "workingarea": "Bangalore",
        "custcountry": "India",
        "grade": "2",
        "openingamt": 8000.0,
        "receiveamt": 11000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 12000.0,
        "phone": "JRTVFDD",
        "agent": {
            "agentcode": 7,
            "agentname": "Anderson",
            "workingarea": "Brisban",
            "commission": 0.13,
            "phone": "045-21447739",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 25,
        "custname": "Sundariya",
        "custcity": "Chennai",
        "workingarea": "Chennai",
        "custcountry": "India",
        "grade": "3",
        "openingamt": 7000.0,
        "receiveamt": 11000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 11000.0,
        "phone": "PPHGRTS",
        "agent": {
            "agentcode": 10,
            "agentname": "McDen",
            "workingarea": "London",
            "commission": 0.15,
            "phone": "078-22255588",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 12,
                "ordamount": 2500.0,
                "advanceamount": 0.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 1,
                        "type": "Cash"
                    }
                ]
            }
        ]
    }
]
```

</details>

<details>
<summary>http://localhost:2019/customers/customer/7</summary>

```JSON
{
    "custcode": 7,
    "custname": "Bolt",
    "custcity": "New York",
    "workingarea": "New York",
    "custcountry": "USA",
    "grade": "3",
    "openingamt": 5000.0,
    "receiveamt": 7000.0,
    "paymentamt": 9000.0,
    "outstandingamt": 3000.0,
    "phone": "DDNRDRH",
    "agent": {
        "agentcode": 8,
        "agentname": "Subbarao",
        "workingarea": "Bangalore",
        "commission": 0.14,
        "phone": "077-12346674",
        "country": ""
    },
    "orders": [
        {
            "ordnum": 3,
            "ordamount": 4500.0,
            "advanceamount": 900.0,
            "orderdescription": "SOD",
            "payments": [
                {
                    "paymentid": 3,
                    "type": "Credit Card"
                },
                {
                    "paymentid": 2,
                    "type": "Gift Card"
                }
            ]
        },
        {
            "ordnum": 10,
            "ordamount": 4000.0,
            "advanceamount": 700.0,
            "orderdescription": "SOD",
            "payments": [
                {
                    "paymentid": 4,
                    "type": "Mobile Pay"
                }
            ]
        }
    ]
}
```

</details>

<details>
<summary>http://localhost:2019/customers/customer/77</summary>

```JSON
{
    "timestamp": "2020-01-08T23:30:47.650+0000",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Customer 77 Not Found",
    "trace": "javax.persistence.EntityNotFoundException: Customer 77 Not Found\n\tat com.lambdaschool.orders.services.CustomersServiceImpl.lambda$findCustomersById$0(CustomersServiceImpl.java:52)\n\tat java.base/java.util.Optional.orElseThrow(Optional.java:408)\n\tat com.lambdaschool.orders.services.CustomersServiceImpl.findCustomersById(CustomersServiceImpl.java:52)\n\tat com.lambdaschool.orders.services.CustomersServiceImpl$$FastClassBySpringCGLIB$$e088be2d.invoke(<generated>)\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:769)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\n\tat org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:366)\n\tat org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:99)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:689)\n\tat com.lambdaschool.orders.services.CustomersServiceImpl$$EnhancerBySpringCGLIB$$389d142b.findCustomersById(<generated>)\n\tat com.lambdaschool.orders.controllers.CustomersController.getCustomerById(CustomersController.java:58)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\n\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:566)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:190)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:138)\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:106)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:888)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\n\tat org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:898)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:634)\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:526)\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:367)\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:860)\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1591)\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\n",
    "path": "/customers/customer/77"
}
```

</details>
<details>
<summary>http://localhost:2019/customers/namelike/mes</summary>

```JSON
[
    {
        "custcode": 1,
        "custname": "Holmes",
        "custcity": "London",
        "workingarea": "London",
        "custcountry": "UK",
        "grade": "2",
        "openingamt": 6000.0,
        "receiveamt": 5000.0,
        "paymentamt": 7000.0,
        "outstandingamt": 4000.0,
        "phone": "BBBBBBB",
        "agent": {
            "agentcode": 3,
            "agentname": "Alford",
            "workingarea": "New York",
            "commission": 0.12,
            "phone": "044-25874365",
            "country": ""
        },
        "orders": []
    },
    {
        "custcode": 22,
        "custname": "Ramesh",
        "custcity": "Mumbai",
        "workingarea": "Mumbai",
        "custcountry": "India",
        "grade": "3",
        "openingamt": 8000.0,
        "receiveamt": 7000.0,
        "paymentamt": 3000.0,
        "outstandingamt": 12000.0,
        "phone": "Phone No",
        "agent": {
            "agentcode": 2,
            "agentname": "Alex",
            "workingarea": "London",
            "commission": 0.13,
            "phone": "075-12458969",
            "country": ""
        },
        "orders": [
            {
                "ordnum": 5,
                "ordamount": 4000.0,
                "advanceamount": 600.0,
                "orderdescription": "SOD",
                "payments": [
                    {
                        "paymentid": 2,
                        "type": "Gift Card"
                    }
                ]
            }
        ]
    }
]
```

</details>

<details>
<summary>http://localhost:2019/customers/namelike/cin</summary>

```JSON
[]
```

</details>

<details>
<summary>http://localhost:2019/agents/agent/9</summary>

```JSON
{
    "agentcode": 9,
    "agentname": "Mukesh",
    "workingarea": "Mumbai",
    "commission": 0.11,
    "phone": "029-12358964",
    "country": "",
    "customers": [
        {
            "custcode": 17,
            "custname": "Charles",
            "custcity": "Hampshair",
            "workingarea": "Hampshair",
            "custcountry": "UK",
            "grade": "3",
            "openingamt": 6000.0,
            "receiveamt": 4000.0,
            "paymentamt": 5000.0,
            "outstandingamt": 5000.0,
            "phone": "MMMMMMM",
            "orders": []
        }
    ]
}
```

</details>

<details>
<summary>http://localhost:2019/orders/order/7</summary>

```JSON
{
    "ordnum": 7,
    "ordamount": 3500.0,
    "advanceamount": 2000.0,
    "orderdescription": "SOD",
    "payments": [
        {
            "paymentid": 4,
            "type": "Mobile Pay"
        }
    ],
    "customer": {
        "custcode": 2,
        "custname": "Micheal",
        "custcity": "New York",
        "workingarea": "New York",
        "custcountry": "USA",
        "grade": "2",
        "openingamt": 3000.0,
        "receiveamt": 5000.0,
        "paymentamt": 2000.0,
        "outstandingamt": 6000.0,
        "phone": "CCCCCCC",
        "agent": {
            "agentcode": 8,
            "agentname": "Subbarao",
            "workingarea": "Bangalore",
            "commission": 0.14,
            "phone": "077-12346674",
            "country": ""
        }
    }
}
```

</details>

### Stretch Goal

<details>
<summary>http://localhost:2019/orders/advanceamount</summary>

```JSON
[
    {
        "ordnum": 1,
        "ordamount": 1000.0,
        "advanceamount": 600.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 1,
                "type": "Cash"
            }
        ],
        "customer": {
            "custcode": 13,
            "custname": "Avinash",
            "custcity": "Mumbai",
            "workingarea": "Mumbai",
            "custcountry": "India",
            "grade": "2",
            "openingamt": 7000.0,
            "receiveamt": 11000.0,
            "paymentamt": 9000.0,
            "outstandingamt": 9000.0,
            "phone": "113-12345678",
            "agent": {
                "agentcode": 2,
                "agentname": "Alex",
                "workingarea": "London",
                "commission": 0.13,
                "phone": "075-12458969",
                "country": ""
            }
        }
    },
    {
        "ordnum": 2,
        "ordamount": 3000.0,
        "advanceamount": 500.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 2,
                "type": "Gift Card"
            }
        ],
        "customer": {
            "custcode": 19,
            "custname": "Steven",
            "custcity": "San Jose",
            "workingarea": "San Jose",
            "custcountry": "USA",
            "grade": "1",
            "openingamt": 5000.0,
            "receiveamt": 7000.0,
            "paymentamt": 9000.0,
            "outstandingamt": 3000.0,
            "phone": "KRFYGJK",
            "agent": {
                "agentcode": 10,
                "agentname": "McDen",
                "workingarea": "London",
                "commission": 0.15,
                "phone": "078-22255588",
                "country": ""
            }
        }
    },
    {
        "ordnum": 3,
        "ordamount": 4500.0,
        "advanceamount": 900.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 3,
                "type": "Credit Card"
            },
            {
                "paymentid": 2,
                "type": "Gift Card"
            }
        ],
        "customer": {
            "custcode": 7,
            "custname": "Bolt",
            "custcity": "New York",
            "workingarea": "New York",
            "custcountry": "USA",
            "grade": "3",
            "openingamt": 5000.0,
            "receiveamt": 7000.0,
            "paymentamt": 9000.0,
            "outstandingamt": 3000.0,
            "phone": "DDNRDRH",
            "agent": {
                "agentcode": 8,
                "agentname": "Subbarao",
                "workingarea": "Bangalore",
                "commission": 0.14,
                "phone": "077-12346674",
                "country": ""
            }
        }
    },
    {
        "ordnum": 5,
        "ordamount": 4000.0,
        "advanceamount": 600.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 2,
                "type": "Gift Card"
            }
        ],
        "customer": {
            "custcode": 22,
            "custname": "Ramesh",
            "custcity": "Mumbai",
            "workingarea": "Mumbai",
            "custcountry": "India",
            "grade": "3",
            "openingamt": 8000.0,
            "receiveamt": 7000.0,
            "paymentamt": 3000.0,
            "outstandingamt": 12000.0,
            "phone": "Phone No",
            "agent": {
                "agentcode": 2,
                "agentname": "Alex",
                "workingarea": "London",
                "commission": 0.13,
                "phone": "075-12458969",
                "country": ""
            }
        }
    },
    {
        "ordnum": 7,
        "ordamount": 3500.0,
        "advanceamount": 2000.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 4,
                "type": "Mobile Pay"
            }
        ],
        "customer": {
            "custcode": 2,
            "custname": "Micheal",
            "custcity": "New York",
            "workingarea": "New York",
            "custcountry": "USA",
            "grade": "2",
            "openingamt": 3000.0,
            "receiveamt": 5000.0,
            "paymentamt": 2000.0,
            "outstandingamt": 6000.0,
            "phone": "CCCCCCC",
            "agent": {
                "agentcode": 8,
                "agentname": "Subbarao",
                "workingarea": "Bangalore",
                "commission": 0.14,
                "phone": "077-12346674",
                "country": ""
            }
        }
    },
    {
        "ordnum": 8,
        "ordamount": 2500.0,
        "advanceamount": 400.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 1,
                "type": "Cash"
            }
        ],
        "customer": {
            "custcode": 3,
            "custname": "Albert",
            "custcity": "New York",
            "workingarea": "New York",
            "custcountry": "USA",
            "grade": "3",
            "openingamt": 5000.0,
            "receiveamt": 7000.0,
            "paymentamt": 6000.0,
            "outstandingamt": 6000.0,
            "phone": "BBBBSBB",
            "agent": {
                "agentcode": 8,
                "agentname": "Subbarao",
                "workingarea": "Bangalore",
                "commission": 0.14,
                "phone": "077-12346674",
                "country": ""
            }
        }
    },
    {
        "ordnum": 10,
        "ordamount": 4000.0,
        "advanceamount": 700.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 4,
                "type": "Mobile Pay"
            }
        ],
        "customer": {
            "custcode": 7,
            "custname": "Bolt",
            "custcity": "New York",
            "workingarea": "New York",
            "custcountry": "USA",
            "grade": "3",
            "openingamt": 5000.0,
            "receiveamt": 7000.0,
            "paymentamt": 9000.0,
            "outstandingamt": 3000.0,
            "phone": "DDNRDRH",
            "agent": {
                "agentcode": 8,
                "agentname": "Subbarao",
                "workingarea": "Bangalore",
                "commission": 0.14,
                "phone": "077-12346674",
                "country": ""
            }
        }
    },
    {
        "ordnum": 11,
        "ordamount": 1500.0,
        "advanceamount": 600.0,
        "orderdescription": "SOD",
        "payments": [
            {
                "paymentid": 2,
                "type": "Gift Card"
            }
        ],
        "customer": {
            "custcode": 8,
            "custname": "Fleming",
            "custcity": "Brisban",
            "workingarea": "Brisban",
            "custcountry": "Australia",
            "grade": "2",
            "openingamt": 7000.0,
            "receiveamt": 7000.0,
            "paymentamt": 9000.0,
            "outstandingamt": 5000.0,
            "phone": "NHBGVFC",
            "agent": {
                "agentcode": 5,
                "agentname": "Santakumar",
                "workingarea": "Chennai",
                "commission": 0.14,
                "phone": "007-22388644",
                "country": ""
            }
        }
    }
]
```

</details>

## Instructions

* [X] Please fork and clone this repository. This repository does not have a starter project, so create one inside of the cloned repository folder. Regularly commit and push your code as appropriate.
* [X] Create the entities needed to store this data.
* [X] A data.sql file has been provided with seed data. You can use this class directly or modify it to fit your models. However, the data found in the file is the seed data to use!

Expose the following endpoints

* [X]  GET /agents/agent/{id} - Returns the agent and their customers with the given agent id
* [X]  GET /orders/order/{id} - Returns the order and its customer with the given order number
* [X]  GET /customers/orders - Returns all customers with their orders
* [X]  GET /customers/customer/{id} - Returns the customer and their orders with the given customer id
* [X]  GET /customers/namelike/{likename} - Returns all customers and their orders with a customer name containing the given substring

### Stretch Goal

* [X] GET /orders/advanceamount - returns all orders with their customers that have an advanceamount greater than 0.

from setuptools import setup, find_packages

setup(
    name="misc-py-utils",
    version="0.0.1",
    url="https://github.com/mmphego/misc-py-utils",
    author="Mpho Mphego",
    author_email="mpho112@gmail.com",
    description="Set of utilities and accessory methods to work with Python.",
    packages=find_packages(exclude=["tests"]),
    zip_safe=False,
    include_package_data=True,
    platforms="any",
    test_suite="tests.test_utils",
)

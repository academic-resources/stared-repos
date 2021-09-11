# Data Structures

In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a __collection of data values, the relationships among them, and the functions or operations that can be applied to the data__.

Sets are the fundamental data structure we seek to represent.

## Augmenting Data Structures

You can program new operations for data structures to support the desired application. Augmenting a data structure is not always straightforward, however, since the added information must be updated and maintained by the ordinary operations on the data structure.

1. Choose an underlying data structure.
2. Determine additional information to maintain in the underlying ds.
3. Verify that we can maintain the additional infromation for the basic modifying operations of the underlying ds withut asymptotically affecting the performance of these operations.
4. Develop new operations.


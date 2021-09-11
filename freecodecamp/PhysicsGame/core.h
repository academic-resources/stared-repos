#ifndef _BAKARIPHYSICSPLUS_CORE_H
#define _BAKARIPHYSICSPLUS_CORE_H

#include "precision.h"

namespace BakariPhysicsPlus {
	/**
	* Holds a vector in 3 dimensions.  Four data members are allocated
	* to ensure alignment in an array.
	*/
	class Vector3
	{
	public:
		real x; // value along the x-axis

		real y; // value along the y-axis

		real z; // value along the z-axis

	private:
		/** Padding to ensure four word alignment **/
		real pad;
		
	public:
		/** Default constructor creates a zero vector */
		Vector3() : x(0), y(0), z(0) {}

		const static Vector3 GRAVITY;
        const static Vector3 HIGH_GRAVITY;
        const static Vector3 UP;
        const static Vector3 RIGHT;
        const static Vector3 OUT_OF_SCREEN;
        const static Vector3 X;
        const static Vector3 Y;
        const static Vector3 Z;

        real operator[](unsigned i) const
        {
            if (i == 0) return x;
            if (i == 1) return y;
            return z;
        }

        real& operator[](unsigned i)
        {
            if (i == 0) return x;
            if (i == 1) return y;
            return z;
        }

		/** The explicit constructor creates a vector with the given components. */
		Vector3(const real x, const real y, const real z)
			: x(x), y(y), z(z) {}

		/** Zeroes all the components of a vector */
		void clear()
		{
			x = y = z = 0;
		}

		/** Flips all the components of the vector */
		void invert()
		{
			x = -x;
			y = -y;
			z = -z;
		}

		/** Gets the magnitude of this vector */
		real magnitude() const
		{
			return sqrtf(x*x + y*y + z*z); // use precision?
		}

		/** Gets the squared magnitude of this vector */

		real squareMagnitude() const
		{
			return x*x + y*y + z*z;
		}

		/** Turns a non-zero vector into a vector of unit length */

		void normalize()
		{
			real l = magnitude();
			if (l > 0)
			{
				(*this) *= ((real)1)/l; // overload operator!!!!
			}
		}

		// Multiplies this vector by the given scalar
		void operator*=(const real value)
		{
			x *= value;
			y *= value;
			z *= value;
		}

		// Returns a copy of the vector scaled by the given value
		Vector3 operator*(const real value) const
		{
			return Vector3(x*value, y*value, z*value);
		}

		// Adds the given vector to this vector
		void operator+=(const Vector3 &v)
		{
			x += v.x;
			y += v.y;
			z += v.z;
		}

		// Returns the value of the given vector added to this
		Vector3 operator+(const Vector3 &v) const
		{
			return Vector3(x+v.x, y+v.y, z+v.z);
		}

		// Subtracts the given vector from this vector
		void operator-=(Vector3 &v)
		{
			x -= v.x;
			y -= v.y;
			z -= v.z;
		}

		// Returns the value of the given vector subtracted from this
		Vector3 operator-(const Vector3 &v) const
		{
			return Vector3(x-v.x, y-v.y, z-v.z);
		}

		// Adds the given vector to this, scaled by the given amount
		void addScaledVector(const Vector3& vector, real scale)
		{
			x += vector.x * scale;
			y += vector.y * scale;
			z += vector.z * scale;
		}

		// calculates and returns the component-wise product of this vector
		// with the given vector
		Vector3 componentProduct(const Vector3 &vector) const
		{
			return Vector3(x*vector.x, y*vector.y, z*vector.z);
		}

		// Performs a component-wise product with the given vector and sets this vector to its result
		void componentProductUpdate(const Vector3 &vector)
		{
			x *= vector.x;
			y *= vector.y;
			z *= vector.z;
		}

		// Calculates and returns the scalar(dot) product of this vector with the given vector
		real scalarProduct(const Vector3 &vector) const
		{
			return (x*vector.x + y*vector.y + z*vector.z);
		}

		// Calculates and returns the scalar(dot) product of this vector with the given vector
		real operator*(const Vector3 &vector) const
		{
			return (x*vector.x + y*vector.y + z*vector.z);
		}

		// Calculates and returns the vector(cross) product of this vector with the given vector
		Vector3 vectorProduct(const Vector3 &vector) const
		{
			return Vector3(y*vector.z - z*vector.y, z*vector.x - x*vector.z, x*vector.y - y*vector.x);
		}

		// Updates this vector to be the vector product of it's current value and the given vector
		void operator %=(const Vector3 &vector)
		{
			*this = vectorProduct(vector);
		}

		// Calculates and returns the vector product of this vector with the given vector
		Vector3 operator%(const Vector3 &vector) const
		{
			return Vector3(y*vector.z - z*vector.y, z*vector.x - x*vector.z, x*vector.y - y*vector.x);
		}

		void makeOrthonormalBasis(Vector3 *a, Vector3 *b, Vector3 *c)
		{
			a->normalize();
			(*c) = (*a) % (*b); // Vector (cross) product
			if (c->squareMagnitude() == 0.0) return; // Generate error?
			c->normalize();
			(*b) = (*c) % (*a);
		}


	};
}
#endif // !_CORE_H
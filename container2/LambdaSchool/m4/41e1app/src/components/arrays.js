/*
 *
 * ### Challenge `getCarInfoById`
 *
 * @instructions
 * getCarInfoById takes two arguments:
 *     (1) an array which is an inventory of cars like the one inside /data/inventory.js.
 *     (2) a number which is the desired car id (see how each car has its own unique id).
 * getCarInfoById returns a string in the format `This is a {car_make} {car_model}
 *
 * For example, if getCarInfoById is invoked with the inventory and the number 1,
 * it will return `This is a Lincoln Navigator`.
 */

// (1) an array which is an inventory of cars like the one inside /data/inventory.js.
function getCarInfoById(inventory, id) {
	// (2) a number which is the desired car id (see how each car has its own unique id).
	for (let x = 0; x < inventory.length; x++) {
		if (inventory[x].id === id) {
			// getCarInfoById returns a string in the format `This is a {car_make} {car_model}
			return `This is a ${inventory[x].car_make} ${inventory[x].car_model}`;
		}
	}
}

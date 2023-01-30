export const TypeUsers = {
    Admin: ["admin"],
    Employee: ["hostess", "waiter", "cook", "employee"],
    Customer: ["customer", "guest"]
}

export const StatusOrder = {
    new: "new",
    preparing: "preparing",
    delivering: "delivering",
    delivered: "delivered",
    returned: "returned",
    paid: "paid",
    cancel: "cancel",
    failed: "failed"
}

export const TypesOrder = {
    restaurant: "restaurant",
    pick_up: "pick_up",
    shipment: "shipment"
}
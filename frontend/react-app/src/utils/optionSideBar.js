export const linksJsonAdmin = {
  login: "/auth/login/user",
  links: [
    {
      topic: "List",
      subTopics: [
        {
          name: "Users",
          url: "/admin/user/"
        },
        {
          name: "Customers",
          url: "/admin/customer/"
        },
        {
          name: "Categories",
          url: "/admin/food/categories"
        },
        {
          name: "Foods",
          url: "/admin/food/dishes"
        }
      ]
    }
  ]
};

export const linksJsonCustomer = {
  login: "/auth/login/customer",
  links: [
    {
      topic: "Order",
      subTopics: [
        {
          name: "Restaurant",
          url: "/admin/food/categories"
        },
        {
          name: "Pick up/Delivery",
          url: "/admin/food/dishes"
        }
      ]
    }
  ]
}

export const linksJsonEmployees = {
  login: "/auth/login/user",
  links: [
    {
      topic: "Cook",
      subTopics: [
        {
          name: "Orders",
          url: "/employee/orders"
        },
        {
          name: "Drinks",
          url: "/employee/drinks"
        }
      ]
    }
  ]
}
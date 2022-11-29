export const linksJsonAdmin = {
  login: "/auth/login/user",
  links: [
    {
      topic: "Food",
      subTopics: [
        {
          name: "Categories",
          url: "/admin/food/categories"
        },
        {
          name: "Dishes and drinks",
          url: "/admin/food/dishes"
        }
      ]
    },
    {
      topic: "User",
      subTopics: [
        {
          name: "List",
          url: "/admin/user/"
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
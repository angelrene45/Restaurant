export const linksJsonAdmin = {
  login: "/auth/login/user",
  links: [
    {
      topic: "CRUD",
      type: "group",
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
    }, 
    {
      topic: "Settings",
      type: "simple",
      url: "/admin/settings"
    },
  ]
};


export const linksJsonEmployees = {
  login: "/auth/login/user",
  links: [
    {
      topic: "Home",
      type: "simple",
      url: "/employee/home"
    },
    {
      topic: "Cook",
      type: "simple",
      url: "/employee/cook"
    }
  ]
}


export const linksJsonCustomer = {
  login: "/auth/login/customer",
  links: [
    {
      topic: "Home",
      type: "group",
      subTopics: [
        {
          name: "Foods",
          url: "/customer/foods"
        },
        {
          name: "Cart Review",
          url: "/customer/cart-review"
        }
      ]
    },
    {
      topic: "Order",
      type: "group",
      subTopics: [
        {
          name: "Search",
          url: "/customer/order/search"
        }
      ]
    }
  ]
}
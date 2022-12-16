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
    },
    {
      topic: "Tables",
      subTopics: [
        {
          name: "Create a table",
          url:"/admin/tables/create_table"
        },
        {
          name: "Edit tables layout",
          url:"/admin/tables/create_table"
        },
        {
          name: "All tables",
          url:"/admin/tables/dishes"
        }
      ]
    },
]};


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


export const linksJsonCustomer = {
  login: "/auth/login/customer",
  links: [
    {
      topic: "Home",
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
      subTopics: [
        {
          name: "Search",
          url: "/customer/order/search"
        }
      ]
    }
  ]
}
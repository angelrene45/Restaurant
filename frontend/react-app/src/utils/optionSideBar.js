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


export const linksJsonEmployees = [
  {
    name: "Inicio",
    url: "/"
  },
  {
    name: "Ventas",
    url: "/ventas"
  },
  {
    name: "Empleados",
    url: "/empleados"
  },
  {
    name: "Proveedores",
    url: "/proveedores"
  },
];



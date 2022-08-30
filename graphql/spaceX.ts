const launchData = `
  id: flight_number
  mission_name
  rocket {
    rocket_type
  }
  launch_site {
    site_name_long
  }
  links {
    article_link
  }
`;

const dragonData = `
  crew_capacity
  description
  name
  id
`;

const PAGINATE_BY = 10;

export { launchData, PAGINATE_BY, dragonData };

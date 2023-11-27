import ProjectsService from "./DataServices/projectsService";
import UsersService from "./DataServices/usersService";

import { countries } from "@/assets/data/countries";

const DataService = {
  projects: { ...ProjectsService },
  users: { ...UsersService },
  //   complaints: { ...ComplaintsService },
  //   products: { ...ProductsService },
  //   partners: { ...PartnersService },
  //   deliveries: { ...DeliveriesService },
  //   orders: { ...OrdersService },
  //   flashOffers: { ...FlashOffersService },
  //   dailyOffers: { ...DailyOffersService },
  //   settings: { ...SettingsService },

  getCountries: (a: any) => {
    try {
      const sortedData = countries.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      return () => {
        return { results: sortedData };
      };
    } catch (e) {
      throw e;
    }
  },
  //   getRegions: () => {
  //     return () => {
  //       try {
  //         // console.log(regions)
  //         return { data: { results: regions.sort((a, b) => a.name.localeCompare(b.name)) } }
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   },
  //   getPlatforms: () => {
  //     return () => {
  //       try {
  //         // console.log(platforms)
  //         return {
  //           data: {
  //             results: platforms.sort((a, b) => a.name.localeCompare(b.name)),
  //           },
  //         }
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   },
};

export default DataService;

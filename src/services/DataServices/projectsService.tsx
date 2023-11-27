import {
  NewProjectDataInput,
  NewProjectDataPayload,
  ProjectData,
} from "@/lib/validations/project.schema";
import axios from "../../axios";

const ProjectsService = {
  getProjects:
    (filter: string | undefined) => async (): Promise<ProjectData[]> => {
      console.log(`/api/projects${filter ? filter : ""}`);
      return await axios
        .get(`/api/projects${filter ? filter : ""}`)
        .then((res) => {
          console.log("@GetProjects data: ", res.data);
          return res.data;
        })
        .catch((e) => {
          throw e;
        });
    },
  getProjectsArchived: () => async (): Promise<ProjectData[]> => {
    return await axios
      .get(`/api/projects/archive`)
      .then((res) => {
        // console.log("@GetProjects data: ", res.data);
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
  createNewProject: () => async (payload: NewProjectDataPayload) => {
    return await axios
      .post("/api/projects", payload)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
  editProject: (id: number) => async (payload: NewProjectDataPayload) => {
    return await axios
      .put(`/api/projects/${id}`, payload)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
  deleteProject: (id: number) => async () => {
    return axios
      .delete(`/api/projects/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
  archiveProject: (id: number) => async () => {
    return axios
      .patch(`/api/projects/${id}/archive`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
  //   getComplaint: (id) => async () => {
  //     return await axios
  //       .get(`/api/refunds/${id}`)
  //       .then((res) => {
  //         console.log("@GetComplaint by ID: ", res.data);
  //         return res.data.data;
  //       })
  //       .catch((e) => {
  //         notifyError(e);
  //         throw e;
  //       });
  //   },
  //   addComplaint: async (data) => {
  //     console.log("@AddComplaint sending: ", data);
  //     return await axios
  //       .post("/api/refunds", data)
  //       .then((res) => {
  //         console.log("@AddComplaint res: ", res.data);

  //         notifySucces("Nowa reklamacja została dodana");
  //         return res.data;
  //       })
  //       .catch((e) => {
  //         notifyError(e);
  //         throw e;
  //       });
  //   },

  //   getComplaintNotes: (id, params) => async () => {
  //     console.log(`/api/refunds/comments/${id}${parseObjectToUrlQuery(params)}`);
  //     return await axios
  //       .get(`/api/refunds/comments/${id}${parseObjectToUrlQuery(params)}`)
  //       .then((res) => {
  //         // console.log('index', res.data.data.results[0].id)
  //         return res.data;
  //       })
  //       .catch((e) => {
  //         notifyError(e);
  //         throw e;
  //       });
  //   },
  //   addComplaintNote: (id) => async (data) => {
  //     console.log("addingComplaintNote", { data });
  //     return await axios
  //       .post(`/api/refunds/comments/${id}`, data)
  //       .then((res) => {
  //         console.log(res.data);
  //         notifySucces("Notatka została zapisana");
  //         return res.data;
  //       })
  //       .catch((e) => {
  //         notifyError(e);
  //         throw e;
  //       });
  //   },
  //   editComplaint: (id) => async (data) => {
  //     console.log("@EditComplaint sending: ", data);
  //     return await axios
  //       .put(`/api/refunds/${id}`, data)
  //       .then((res) => {
  //         console.log("@EditComplaint res: ", res.data);
  //         notifySucces("Reklamacja została zmieniona");
  //         return res.data;
  //       })
  //       .catch((e) => {
  //         notifyError(e);
  //         throw e;
  //       });
  //   },
};

export default ProjectsService;

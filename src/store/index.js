import { createStore } from "vuex";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  ref as dbRef,
  get,
  child,
  getDatabase,
  push,
  set,
  update,
} from "firebase/database";

export default createStore({
  state: {
    organizationTypes: [],
    organizationList: [],
    isMobile: true,
    isDesktop: false,
  },
  getters: {
    organizationTypes: (s) => s.organizationTypes,
    organizationList: (s) => s.organizationList,
    organizationItem: (s) => (id) =>
      s.organizationList.find((org) => org.id === id),
    organizationTypeById: (s) => (id) =>
      s.organizationTypes.find((orgT) => orgT.id === id).title,

    isMobile: (s) => s.isMobile,
    isDesktop: (s) => s.isDesktop,
  },
  mutations: {
    setMobile(state) {
      state.isMobile = true;
      state.isDesktop = false;
      // state.key++;
    },
    setDesktop(state) {
      state.isMobile = false;
      state.isDesktop = true;
      // state.key++;
    },

    setOrganizationTypes(state, organizationTypes) {
      state.organizationTypes = organizationTypes;
    },
    setOrganizations(state, organizations) {
      state.organizationList = organizations;
    },
    updateOrganization(state, updatedOrganization) {
      let idx = state.organizationList.findIndex(
        (org) => org.id === updatedOrganization.id
      );

      state.organizationList[idx] = updatedOrganization;
    },
    pushOrganization(state, organization) {
      state.organizationList.push(organization);
    },
  },
  actions: {
    async uploadImageAndGetUrl({ commit }, { id, image }) {
      const storage = getStorage();

      const fileName = `${id}_logo`;
      const storageFileLink = `organizations/${fileName}`;

      const storageRef = stRef(storage, storageFileLink);

      const fileData = await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef)
        .then((url) => url)
        .catch((e) => "");

      return url;
    },

    async deleteImage(_, id) {
      const storage = getStorage();

      const deleteRef = stRef(storage, `organizations/${id}_logo`);

      await deleteObject(deleteRef)
        .then(() => {})
        .catch((e) => console.log("Что-то пошло не так: ", e.message));
    },

    async fetchOrganizationTypes({ commit }) {
      try {
        // const dbRef = dbRef(getDatabase());
        const organizationTypesLink = `organizationTypes/`;

        const organizationTypes = await get(
          child(dbRef(getDatabase()), organizationTypesLink)
        ).then((snapshot) => {
          if (snapshot.exists()) {
            return Object.keys(snapshot.val()).map((key) => ({
              id: key,
              ...snapshot.val()[key],
            }));
          } else return [];
        });

        commit("setOrganizationTypes", organizationTypes);

        // return organizationTypes;
      } catch (e) {}
    },

    async fetchOrganization({ commit }) {
      try {
        // const dbRef = ref(getDatabase());
        const organizationLink = `organizationList/`;

        const organizations = await get(
          child(dbRef(getDatabase()), organizationLink)
        ).then((snapshot) => {
          if (snapshot.exists()) {
            return Object.keys(snapshot.val()).map((key) => ({
              id: key,
              ...snapshot.val()[key],
            }));
          } else return [];
        });

        commit("setOrganizations", organizations);

        return organizations;
      } catch (e) {}
    },

    async createOrganization({ commit, dispatch }, data) {
      const newOrg = data.newOrg;
      const image = data.image;
      const db = getDatabase();

      const organizationInfoRef = dbRef(db, "organizationList/");
      const newOrganizationRef = push(organizationInfoRef);
      const id = newOrganizationRef.key;

      const logoUrl = await dispatch("uploadImageAndGetUrl", { id, image });

      await set(newOrganizationRef, { ...newOrg, logo: logoUrl });

      const newOrganization = {
        ...newOrg,
        id,
        logo: logoUrl,
      };

      commit("pushOrganization", newOrganization);
    },

    async updateOrganization({ commit, dispatch }, data) {
      try {
        const updatedOrg = data.updatedOrg;
        const image = data.image;

        const db = getDatabase();
        const id = updatedOrg.id;

        if (image) {
          await dispatch("deleteImage", id);
          updatedOrg.logo = await dispatch("uploadImageAndGetUrl", {
            id,
            image,
          });
        }

        const updatedOrganizationLink = `organizationList/${updatedOrg.id}/`;
        const updatedOrganizationRef = dbRef(db, updatedOrganizationLink);

        const dbData = {
          typeId: updatedOrg.typeId,
          typeName: updatedOrg.typeName,
          organizationName: updatedOrg.organizationName,
          description: updatedOrg.description,
          logo: updatedOrg.logo,
        };

        update(updatedOrganizationRef, dbData);

        commit("updateOrganization", updatedOrg, { root: true });
      } catch (e) {}
    },
  },
  modules: {},
});

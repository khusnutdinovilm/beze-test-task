<template>
  <div v-if="loading">Загрузка</div>
  <div class="container card-list" v-else>
    <organization-create @open-modal="openModal" />

    <organization-item
      v-for="organization in organizationList"
      :key="organization.id"
      :organizationItem="organization"
      @update-organization="updateFormData(organization)"
    />

    <app-modal v-if="isModalOpen" @close-modal="closeModal">
      <organization-form
        :formData="formData"
        @close-modal="closeModal"
        @update-organization="updateOrganization"
        @create-organization="createOrganization"
      />
    </app-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import OrganizationItem from "@/components/OrganizationItem.vue";
import OrganizationCreate from "./components/OrganizationCreate.vue";
import OrganizationForm from "./components/OrganizationForm.vue";
import AppModal from "@/components/app/AppModal.vue";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const organizationList = ref([]);
    const isModalOpen = ref(false);
    const updated = ref(0);

    const formData = ref({});

    const loading = ref(true);

    const set = () =>
      window.innerWidth >= 800
        ? store.commit("setDesktop")
        : store.commit("setMobile");

    set();
    window.addEventListener("resize", set);

    const setFormData = async () => {
      formData.value = {
        typeId: store.getters.organizationTypes[0].id,
        typeName: store.getters.organizationTypes[0].title,
        organizationName: "",
        description: "",
      };
    };

    onMounted(async () => {
      organizationList.value = await store.dispatch("fetchOrganization");

      await store.dispatch("fetchOrganizationTypes");

      setFormData();

      loading.value = false;
    });

    const updateOrganization = async (updatedOrganization, image) => {
      try {
        const idx = organizationList.value.findIndex(
          (org) => org.id === updatedOrganization.id
        );
        await store.dispatch("updateOrganization", {
          updatedOrg: {
            ...updatedOrganization,
            logo: organizationList.value[idx].logo,
          },
          image,
        });
        setFormData();
      } catch (error) {}

      isModalOpen.value = false;
    };

    const createOrganization = async (newOrganization, image) => {
      try {
        await store.dispatch("createOrganization", {
          newOrg: { ...newOrganization },
          image,
        });
        setFormData();
      } catch (error) {}

      isModalOpen.value = false;
    };

    return {
      organizationList,
      updated,
      loading,
      isModalOpen,
      formData,
      updateOrganization,
      createOrganization,
      updateFormData: async (organization) => {
        formData.value = { ...organization };
        isModalOpen.value = true;
      },
      openModal: () => (isModalOpen.value = true),
      closeModal: () => {
        setFormData();
        isModalOpen.value = false;
      },
    };
  },
  components: {
    OrganizationItem,
    OrganizationCreate,
    AppModal,
    OrganizationForm,
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:wght@300;400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')

*
  margin: 0
  padding: 0
  font-family: 'Roboto', 'sans-serif'

body
  background-color: #9747FF

.container
  max-width: 722px
  margin: auto

.required
  font-size: 14px
  font-weight: 500
  line-height: 20px
  color: #D91D0B

.card-list
  display: flex
  flex-direction: column
  gap: 15px
</style>

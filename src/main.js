import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCMgDYGM2lE4Liqo5D01J48dJztteWI9lM",
  authDomain: "beze-test-task.firebaseapp.com",
  databaseURL:
    "https://beze-test-task-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beze-test-task",
  storageBucket: "beze-test-task.appspot.com",
  messagingSenderId: "805231741918",
  appId: "1:805231741918:web:b1bfb5cc6cc60c92502b4f",
};
const app = initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FB_API_KEY,
//   authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FB_DB_URL,
//   projectId: "beze-test-task",
//   storageBucket: process.env.VUE_APP_STORAGE,
//   messagingSenderId: "805231741918",
//   appId: process.env.VUE_APP_APP_ID,
// };

import CustomSelect from "@/components/ui/CustomSelect.vue";
import CustomInput from "@/components/ui/CustomInput.vue";
import CustomTextarea from "@/components/ui/CustomTextarea.vue";

createApp(App).use(store).mount("#app");

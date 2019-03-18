import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';

// components
import Vuetify from 'vuetify/es5/components/Vuetify'; // required
import VApp from 'vuetify/es5/components/VApp'; // required
import VGrid from 'vuetify/es5/components/VGrid';
import VAlert from 'vuetify/es5/components/VAlert';
import VBtn from 'vuetify/es5/components/VBtn';
import VCard from 'vuetify/es5/components/VCard';
import VDataTable from 'vuetify/es5/components/VDataTable';
import VDialog from 'vuetify/es5/components/VDialog';
import VForm from 'vuetify/es5/components/VForm';
import VInput from 'vuetify/es5/components/VInput';
import VSelect from 'vuetify/es5/components/VSelect';
import VTextField from 'vuetify/es5/components/VTextField';
import VTextarea from 'vuetify/es5/components/VTextarea';
import VCheckbox from 'vuetify/es5/components/VCheckbox';
import VIcon from 'vuetify/es5/components/VIcon';
import VDatePicker from 'vuetify/es5/components/VDatePicker';
import VTabs from 'vuetify/es5/components/VTabs';
import VToolbar from 'vuetify/es5/components/VToolbar';
import VList from 'vuetify/es5/components/VList';
import VPagination from 'vuetify/es5/components/VPagination';
import VDivider from 'vuetify/es5/components/VDivider';
import VFooter from 'vuetify/es5/components/VFooter';
import transitions from 'vuetify/es5/components/transitions';

// directives
import { Ripple } from 'vuetify/es5/directives';


Vue.use(Vuetify, {
    theme: {
        primary: '#3CA7E1',
        secondary: '#8fced7',
        accent: '#fad46f',
        error: '#e7695d',
        success: '#49bc78',
        info: '#3CA7E1',
    },
    components: {
        VApp,
        VGrid,
        VAlert,
        VBtn,
        VCard,
        VDataTable,
        VDialog,
        VForm,
        VInput,
        VSelect,
        VTextField,
        VTextarea,
        VCheckbox,
        VIcon,
        VDatePicker,
        VTabs,
        VToolbar,
        VList,
        VPagination,
        VDivider,
        VFooter,
        transitions,
    },
    directives: {
        Ripple,

    },
});

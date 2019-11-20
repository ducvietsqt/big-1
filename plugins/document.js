import Vue from 'vue'
import moment from 'moment'
Vue.mixin({
    // global assets go here
    methods: {
      $_vueSetDocumentTitle(title) {
        document.title = title
      },
      $_labelMember(ID) {
        let u = this.$store.getters['workspace/findMemberByID'](ID)
        return u.name || u.username  || u.email || `@${u.userID}`
      },

      $_member(ID) {
        try {
          return this.$store.getters['workspace/findMemberByID'](ID)
        }catch (e) {
          return null
        }
      },
      $_labelTask(ID) {
        let u = this.$store.getters['workspace/findTaskByID'](ID)
        try {
          return u.name
        }catch (e) {
          return `#${ID}`
        }
      },
      $hexToRgbA(hex, opacity){ // TODO: #879FF00 => rgba(345,67,89,0.2)
        let c, opc;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          opc = opacity ? opacity : '.2';
          opc.toString();
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opc+')';
        }
        throw new Error('Bad Hex');
      },
      $formatDateTime(val, fm) {
        // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
        // moment().format('dddd');                    // Tuesday
        // moment().format("MMM Do YY");               // Oct 29th 19
        // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
        // moment().format();
        try {
          if(fm) return moment(val).format(fm);
          return moment(val).format("MMM Do YY");
        }catch (e) {
          console.log(e.message)
          return '---'
        }
      },
      $isUpcoming(current_date) {
        return moment(current_date).isAfter(moment(new Date()).format('YYYY-MM-DD'))
      },

      $_court(ID) {
        try {
          return this.$store.getters['courts/findCourtByID'](ID)
        }catch (e) {
          return null
        }
      }
    },
    filters: {
      $strName(val) {  // TODO: 'Viet Ho' => 'VH'
        if(!val) return 'N/A';
        let temp = val.trim().split(' ');
        if(temp.length === 0) return 'N/A';
        if(temp.length === 1 && temp[0].length >= 2) return temp[0].charAt(0) + temp[0].charAt(0);
        if(temp.length === 1 && temp[0].length < 2) return temp[0].charAt(0);
        return temp[0].charAt(0) + temp[temp.length - 1].charAt(0);
      },
      $formatDate(val, fm) {
        // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
        // moment().format('dddd');                    // Tuesday
        // moment().format("MMM Do YY");               // Oct 29th 19
        // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
        // moment().format();
        try {
          if(fm) return moment(val).format(fm);
          return moment(val).format("MMM Do YY");
        }catch (e) {
          console.log(e.message)
          return '---'
        }
      },
      $formatFullDate(val, fm) {
        // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
        // moment().format('dddd');                    // Tuesday
        // moment().format("MMM Do YY");               // Oct 29th 19
        // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
        // moment().format();
        try {
          if(fm) return moment(val).format(fm);
          return moment(val).format('MMM Do YY, h:mm:ss a');
        }catch (e) {
          console.log(e.message)
          return '---'
        }
      },
      $isUpcoming(current_date) {
        return moment(current_date).isAfter(moment(new Date()).format('YYYY-MM-DD'))
      }


    }
  }
)

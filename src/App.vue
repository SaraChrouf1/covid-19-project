<template>

    <div class="container-fluid " > 

        <header class="masthead pt-2 ">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                <div class="col-12 text-center">
                    <h1 class="text-light">COVID-19 Simple Dashboard in Saudi Arabia</h1>
                    <p class="lead text-light">Up-to-date Interactive Statistics </p>
                </div>
                </div>
            </div>
            </header>

        <div class="row justify-content-center my-5">
            <div class="row">

                <div id="chart" class="col-md-12 col-lg-6" >
                    <h2>Total Number of Tests</h2>
                    <div class="col-xs-offset 1 col-xs-11 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
                        <div class="btn-toolbar" role="toolbar">
                            <div class="btn-group btn-group-justified" role="group">
                                <div class="btn-group" role="group">
                                    <button id="list" class="btn btn-primary" @click="updateData('one_month')" :class="{active: selection==='one_month'}" >1M</button>
                                </div>
                                <div class="btn-group" role="group">
                                <button id="new" class="btn btn-primary" @click="updateData('six_months')" :class="{active: selection==='six_months'}" >6M</button>
                                </div>
                                <div class="btn-group" role="group">
                                <button id="passreset" class="btn btn-primary" @click="updateData('one_year')" :class="{active: selection==='one_year'}">1Y</button>
                                </div>
                                <div class="btn-group" role="group">
                                <button id="desact" class="btn btn-primary"  @click="updateData('all')" :class="{active: selection==='all'}">All</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div id="chart-timeline">
                        <apexchart type="area" height="350" ref="chart" :options="tChartOptions" :series="tSeries"></apexchart>
                    </div>
                </div>
                <!-- ========== Pie Chart Daily caese ========== -->
               <div class=" col-md-12 col-lg-6">
                    <h2>Top n Cases</h2>
                    <p>
                        <input type="range" value="5" v-model="n" min="2" max="15" data-step="1"  @change="updateBar" />
                    <b>{{n}}</b> </p>

                   <vue-tabs @tab-change="handleTabChange" activeTextColor="#0d6efd">
                        <v-tab  title="Active Cases" >
                            <apexchart  v-if="tabIndex==0" type="bar" height="350" :options="activeBarChartOptions" :series="activeBarSeries"></apexchart>
                        </v-tab>

                        <v-tab  title="Confirmed Cases" >
                            <apexchart v-if="tabIndex==1" type="bar" height="350" :options="confirmedBarChartOptions" :series="confirmedBarSeries"></apexchart>
                        </v-tab>

                        <v-tab  title="Dead Cases"  >
                            <apexchart v-if="tabIndex==2" type="bar" height="350" :options="deadBarChartOptions" :series="deadBarSeries"></apexchart>
                        </v-tab>
                         <v-tab  title="Recovered Cases" >
                            <apexchart v-if="tabIndex==3" type="bar" height="350" :options="recoveredBarChartOptions" :series="recoveredBarSeries"></apexchart>
                        </v-tab>
                    </vue-tabs>


                </div>


               
                <!-- ========== End Section ========== -->


            
            </div>
             <!-- ========== Total cases by area ========== -->
            
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="graphic-container">
                        <h2>Total Cases by Area</h2>

                            <div>
                                <Select2 v-if="areas.length" v-model="cites" :options="areas" :settings="{ multiple: true ,placeholder: ' Plaese select area or multiple areas' }" @change="myChangeEvent($event)"  />
                                <div v-if="cites.length">
                                  <span v-for="(city,i) in cites" :key="i" class="badge bg-primary mx-1">{{city}}</span>
                                </div>
                            </div>  

                        <apexchart type="bar" height="350" :options="totalChartOptions" :series="totalSeries"></apexchart>
                    </div> 
                </div>
               
            </div>
             <!-- ========== End Section ========== -->


        </div>
        <footer class="text-center text-lg-start mastheadsmall d-flex flex-column" >
          <div class="container d-flex justify-content-center pt-5">
           
            <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                 <a class="link-light" href="https://www.linkedin.com/in/sara-sharrouf-157056167/"><font-awesome-icon icon="fa-brands fa-linkedin" /></a>
            </button>
            <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
               <a class="link-light" href="mailto:sarasharrouf.1234@gmail.com"><font-awesome-icon icon="fa-solid fa-envelope" /></a>
            </button>
            <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
             <a class="link-light" href="https://github.com/SaraChrouf1"><font-awesome-icon icon="fa-brands fa-github" /></a> 
            </button>
          </div>

          <!-- Copyright -->
          
          <div class="text-center text-white mt-auto p-2" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2022 Copyright:
            <a class="text-white" href="https://www.linkedin.com/in/sara-sharrouf-157056167/">Sara Chrouf</a>
          </div>
          <!-- Copyright -->
        </footer>    

        
    </div>

</template>

<script>



export default {
    data () {
        return{

            tabIndex:0,
            cites: [],
            selectedAreas:[],
            actives:[],
            confirmed:[],
            deaths:[],
            recovers:[],
            n:5,
            activeAreas:{},
            confirmedAreas:{},
            deathsAreas:{},
            recoverdAreas:{},
            areas:[],
            totalSeries: [],
            selection: 'all',
            testsData:{},
            reducedTestsData :{},
            TotalByArea:{},
            reducedTotalByArea :{},
            
            
            activeBarSeries: [{
                data: []
            }],
            activeBarChartOptions: {
            

                noData: {  
                text: "Loading...",  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
                },
                chart: {
                type: 'bar',
                height: 350
                
                },
                plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
                },
                dataLabels: {
                enabled: false
                },
                xaxis: {
                categories: [],
                }
            },
            confirmedBarSeries: [{
                data: []
            }],
            confirmedBarChartOptions: {
                
                noData: {  
                text: "Loading...",  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
                },
                chart: {
                type: 'bar',
                height: 350
                },
                plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
                },
                dataLabels: {
                enabled: false
                },
                xaxis: {
                categories: [],
                }
            },
            deadBarSeries: [{
                data: []
            }],
            deadBarChartOptions: {
                noData: {  
                text: "Loading...",  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
                },
                chart: {
                type: 'bar',
                height: 350
                },
                plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
                },
                dataLabels: {
                enabled: false
                },
                xaxis: {
                categories: [],
                }
            },
            recoveredBarSeries: [{
                data: []
            }],
            recoveredBarChartOptions: {
                noData: {  
                text: "Loading...",  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
                },
                chart: {
                type: 'bar',
                height: 350
                },
                plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
                },
                dataLabels: {
                enabled: false
                },
                xaxis: {
                categories: [],
                }
            },
            tSeries: [{
            data: []
            }],
            tChartOptions: {
            
            noData: {  
                text: "Loading...",  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
                },

            chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                enabled: false,
                
            },
            animations: {
                    enabled: false,
                    },
            
                
            },
            annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                
            }],
            xaxis: [{
            
                borderColor: '#999',
                yAxisIndex: 0,
                
            }]
            },
            dataLabels: {
            enabled: false
            },
            markers: {
            size: 0,
            style: 'hollow',
            },
            xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2020').getTime(),
            max: new Date().getTime(),
            tickAmount: 6,
            },
            tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
            },
            fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
            },
            },
            
            totalChartOptions: {
                noData: {  
                    text: "Plaese select areas to view",  
                    align: 'center',  
                    verticalAlign: 'middle',  
                    offsetX: 0,  
                    offsetY: 0,  
                    style: {  
                        color: "#000000",  
                        fontSize: '14px',  
                        fontFamily: "Helvetica"  
                    }  
                    },
                chart: {
                type: 'bar',
                height: 350
                },
                plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
                },
                dataLabels: {
                enabled: false
                },
                stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
                },
                xaxis: {
                categories:[],
                },
                yaxis: {
                
                title: {
                    text: 'Cases'
                }
                },
                fill: {
                opacity: 1
                },
                
            },
                }


        
    },
    components: {
     },

    methods: {
      async callApi(method,url,dataObj){
            try {
                return await this.axios({
                    method:method,
                    url: url,
                    data: dataObj
                  });
                  
            } catch (error) {
                return error.response;
                
            }


        },
        handleTabChange(tabIndex){
        console.log(tabIndex)
        this.tabIndex=tabIndex;
    },

        updateBar(){

           const arr=[{
                data:this.activeAreas.data.slice(0, this.n),
            }]
            this.activeBarSeries=arr;
            const labelscut= this.activeAreas.areas.slice(0, this.n);
            this.activeBarChartOptions = {...this.activeBarChartOptions, ...{
                xaxis: {
                    categories:labelscut
                }

                }};


            const confirmedArr=[{
                data:this.confirmedAreas.data.slice(0, this.n),
            }]
            this.confirmedBarSeries=confirmedArr;
            const confirmedLabelscut= this.confirmedAreas.areas.slice(0, this.n);
            this.confirmedBarChartOptions = {...this.confirmedBarChartOptions, ...{
                xaxis: {
                    categories:confirmedLabelscut
                }
                }};
            
            const deadArr=[{
                data:this.deathsAreas.data.slice(0, this.n),
            }]
            this.deadBarSeries=deadArr;
            const deadLabelscut= this.deathsAreas.areas.slice(0, this.n);
            this.deadBarChartOptions = {...this.deadBarChartOptions, ...{
                xaxis: {
                    categories:deadLabelscut
                }
                }};
            
            const recoveredArr=[{
                data:this.recoverdAreas.data.slice(0, this.n),
            }]
            this.recoveredBarSeries=recoveredArr;
            const recoveredLabelscut= this.recoverdAreas.areas.slice(0, this.n);
            this.recoveredBarChartOptions = {...this.recoveredBarChartOptions, ...{
                xaxis: {
                    categories:recoveredLabelscut
                }
                }};


        },
        myChangeEvent(val){
            const indixes =[];
            for (let i=0; i<val.length; i++){

                indixes.push(this.areas.indexOf(val[i]))
            }



            var finalTotals = [{
                name :'Total Active cases',
                data:indixes.map(i => this.actives[i]),

                },
                {
                name :'Total Confirmed  cases',
                data: indixes.map(j => this.confirmed[j]),
                },
                {
                name :'Total deaths ',
                data: indixes.map(k => this.deaths[k]),

                },
                {
                name :'Total recovered cases',
                data: indixes.map(l => this.recovers[l]),

                },
            
            ];
            const subAreas =indixes.map(t => this.areas[t])
            this.totalSeries=finalTotals;
            this.totalChartOptions = {...this.totalChartOptions, ...{
                chart: {
                type: 'bar',
                height: 350,
                width:'100%',

                },
                xaxis: {
                    categories: subAreas
                }
                }};

        },
        updateData(timeline){
         this.selection = timeline
         var today = new Date();

            switch (timeline) {
              case 'one_month':
                var pastMonth = new Date();
                pastMonth.setDate(today.getDate()-30);
                
                this.$refs.chart.zoomX(
                  pastMonth.getTime(),
                  today.getTime()
                )
                break
              case 'six_months':
                var sixMonth = new Date();
                sixMonth.setDate(today.getDate()-180);
                
                this.$refs.chart.zoomX(
                  sixMonth.getTime(),
                  today.getTime()
                )
                break
              case 'one_year':
                var year = new Date();
                year.setDate(today.getDate()-360);
                
                this.$refs.chart.zoomX(
                  year.getTime(),
                  today.getTime()
                )
                break
              case 'all':
                this.$refs.chart.zoomX(
                  new Date('01 Mar 2020').getTime(),
                  today
                )
                break
              default:
            }
          }
        
        
    
    },
    async created() {

        //delete axios.defaults.headers.common['X-Requested-With'];
        const [res, res2] = await Promise.all([
			this.callApi('get', 'https://services6.arcgis.com/bKYAIlQgwHslVRaK/arcgis/rest/services/DailyTestPerformance_ViewLayer/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'),
			this.callApi('get', 'https://services6.arcgis.com/bKYAIlQgwHslVRaK/arcgis/rest/services/CasesByGovernoratesViewLayer/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'),

		])


        if (res.status == 200){
            var temps=res.data.features;
            
            var temp1;
            for (var x = 0, leni = temps.length; x < leni; x++) {
                temp1 = temps[x]; // department
                
                temps[x] = temp1.attributes 
            }
            this.testsData=temps;                                                        
            this.reducedTestsData = this.testsData.map(({ ReportDate, DailyTest }) => ({
                                                                        ReportDate, 
                                                                        DailyTest, 
                                                                         
                                                                        }));

            const result = this.reducedTestsData.map(Object.values);

           
            const arr=[{ name: 'Cases', data: result }]
            this.tSeries=arr;


        }

        if (res2.status == 200){
            var tempsTotalByArea=res2.data.features;
            
            var temp2;
            for (var y = 0, len = tempsTotalByArea.length; y < len; y++) {
                temp2 = tempsTotalByArea[y]; // department
                
                tempsTotalByArea[y] = temp2.attributes 
            }

            this.TotalByArea=tempsTotalByArea;                                                        
            this.reducedTotalByArea = this.TotalByArea.map(({ Governorate_Name_EN, TotalActive,TotalConfirmed,TotalDeaths,TotalRecovered }) => ({
                                                                        Governorate_Name_EN, 
                                                                        TotalActive, 
                                                                        TotalConfirmed,
                                                                        TotalDeaths,
                                                                        TotalRecovered
                                                                         
                                                                        }));

            var result = this.reducedTotalByArea.map(Object.values).sort((a, b) => b[1] - a[1]);

            var areas=[];
            var actives=[];
            var confirmed=[];
            var deaths=[];
            var recovers=[];

           for(let z = 0; z < result.length; z++){
                areas[z]=result[z][0];
                actives[z]=result[z][1];
                
                }
            this.actives=actives
            this.confirmed=confirmed
            this.deaths=deaths
            this.recovers=recovers
            this.areas=areas


            //set bar chars values
            const activeArr=[{
                data:actives.slice(0, this.n),
            }]
            this.activeBarSeries=activeArr;
            const labelscut= areas.slice(0, this.n);
            this.activeBarChartOptions = {...this.activeBarChartOptions, ...{
                xaxis: {
                    categories:labelscut
                }
                }};

          this.activeAreas={data:actives,areas: areas}

          result = result.sort((a, b) => b[2] - a[2]);
          for(let s= 0; s < result.length; s++){
                areas[s]=result[s][0];
                confirmed[s]=result[s][2];
                }

          this.confirmedAreas={data:confirmed,areas: areas}


            const confirmedArr=[{
                data:confirmed.slice(0, this.n),
            }]
            this.confirmedBarSeries=confirmedArr;
            const confirmedLabelscut= areas.slice(0, this.n);
            this.confirmedBarChartOptions = {...this.confirmedBarChartOptions, ...{
                xaxis: {
                    categories:confirmedLabelscut
                }
                }};


            result = result.sort((a, b) => b[3] - a[3]);
            for(let g = 0; g < result.length; g++){
                    areas[g]=result[g][0];
                    deaths[g]=result[g][3];
                    }
                    
            this.deathsAreas={data:deaths,areas: areas}

            const deadArr=[{
                data:deaths.slice(0, this.n),
            }]
            this.deadBarSeries=deadArr;
            const deadLabelscut= areas.slice(0, this.n);
            this.deadBarChartOptions = {...this.deadBarChartOptions, ...{
                xaxis: {
                    categories:deadLabelscut
                }
                }};

            result = result.sort((a, b) => b[4] - a[4]);
            for(let p = 0; p < result.length; p++){
                    areas[p]=result[p][0];
                    recovers[p]=result[p][4];
                    }

            this.recoverdAreas={data:recovers,areas: areas}

            const recoveredArr=[{
                data:recovers.slice(0, this.n),
            }]
            this.recoveredBarSeries=recoveredArr;
            const recoveredLabelscut= areas.slice(0, this.n);
            this.recoveredBarChartOptions = {...this.recoveredBarChartOptions, ...{
                xaxis: {
                    categories:recoveredLabelscut
                }
                }};
            
            
            



        }
       

       

    }



}
</script>

<style>
.graphic-container {
  overflow-y: hidden;
  overflow-x: auto;
}
.dropdown.dropdown-scroll .dropdown-list{
    max-height: 233px;
    overflow-y: auto;
    list-style-type: none;
    padding-left: 10px;
    margin-bottom: 0px;
}
.dropdown-list  li{
    font-size: 14px;
    height: 20px;
}

.dropdown-list  li > a{
    color: black;
}
.dropdown-list a:hover{
   color: black;
}

.dropdown-list li:hover{
    background-color: lightgray;
}

.masthead {
  height: 30vh;
  min-height: 30px;
  background-image: url('https://source.unsplash.com/aZKctjHYjwI/1920x1080');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.mastheadsmall{

    height: 20vh;
    min-height: 20px;
    background-image: url('https://source.unsplash.com/aZKctjHYjwI/1920x1080');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

</style>

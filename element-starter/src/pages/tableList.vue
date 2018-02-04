<template>
    <div>
        <el-table
                v-loading="loading"
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="title"
                    label="电影名字"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="year"
                    label="年"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="alt"
                    label="链接">
            </el-table-column>
            <el-table-column
                    prop="genres"
                    label="类型">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editClick(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                tableData: [],
                total : 0,
                page : 1,
                count:10,
                loading : true
            }
        },
        methods:{
           getListData(){
               this.loading = true;
               axios.get('/api/v2/movie/coming_soon?count='+this.count+'&start='+this.page).then(d => {
                   this.tableData = d.data.subjects;
                   for (let i = 0; i < d.data.subjects.length; i++) {
                       this.tableData[i].genres =  d.data.subjects[i].genres.join(',');
                   }
                   this.total  = d.data.total;
                   this.loading = false;
               });
           },
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            },
            handleClick(row) {
                console.log(row);
            },
            editClick(index,row){
                console.log(index);
            }
        },
        mounted(){
            this.getListData();
        }
    }
</script>
<template>
	<div>
		<el-button @click="resetDateFilter">清除日期过滤器</el-button>
		<el-button @click="clearFilter">清除所有过滤器</el-button>
		<el-table
			max-height="500"
			ref="filterTable"
			:data="items"
			style="width: 100%"
			:default-sort="{ prop: 'date', order: 'ascending' }"
			:show-summary="true"
			:summary-method="getSummaries"
			:highlight-current-row="true"
		>
			<el-table-column width="50" fixed> </el-table-column>
			<el-table-column
				fixed
				prop="date"
				:label="`${title}日期`"
				sortable
				width="150"
				column-key="date"
				:filters="filterMonths"
				:filter-method="filterMonth"
			>
			</el-table-column>
			<el-table-column
				prop="stuName.name"
				label="姓名"
				sortable
				width="100"
				column-key="stuName"
				:filters="filterNames"
				:filter-method="filterName"
			>
			</el-table-column>
			<slot></slot>
		</el-table>
	</div>
</template>

<script>
	export default {
		props: {
			title: { type: String, required: true },
			items: { type: Array, required: true },
			filterMonths: { type: Array, required: true },
			filterNames: { type: Array, required: true },
			getSummaries: { type: Function },
		},
		data() {
			return {};
		},
		methods: {
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},

			filterMonth(value, row) {
				return row.date.slice(0, 7) === value;
			},

			filterName(value, row) {
				return row.stuName.name === value;
			},
		},
	};
</script>

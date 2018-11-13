import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCmrLeads: ['leads'],
  getListAppointments: ['appointments'],
  getListReplies: ['replies'],
  getCrmFilterList: ['type', 'leadStatus', 'leadAssigned', 'leadSort', 'sortOrder'],
  getType: ['type'],
  getLeadStatus: ['leadStatus'],
  getLeadAssigned: ['leadAssigned'],
  getLeadSort: ['leadSort'],
  getSortOrder: ['sortOrder'],
  getTemperature: ['temperature'],
  getListTimeLines: ['timeLines'],
  getSingleLead: ['lead'],
  getListUserTasks: ['tasks'],
  getLeadDto: ['leadDTO'],
  getSource: ['source'],
  getCreditApplicationDto: ['creditApplication'],
  getTaskType: ['taskType'],
  getLeadStatuss: ['leadStatuss']
})

export const MarketingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  leads: [],
  source: [],
  lead: {},
  creditApplication: {},
  leadDTO: {},
  taskType: {},
  tasks: [],
  appointments: [],
  replies: [],
  type: [],
  temperature: [],
  leadStatus: [],
  leadStatuss: [],
  leadAssigned: [],
  leadSort: [],
  sortOrder: [],
  timeLines: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const MarketingSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getLeadStatuss = (state, { leadStatuss }) =>
  state.merge({ leadStatuss })

export const getTaskType = (state, { taskType }) =>
  state.merge({ taskType })

export const getSource = (state, { source }) =>
  state.merge({ source })

export const getLeadDto = (state, { leadDTO }) =>
  state.merge({ leadDTO })

export const getCreditApplicationDto = (state, { creditApplication }) =>
  state.merge({ creditApplication })

export const getTemperature = (state, { temperature }) =>
  state.merge({ temperature })

export const getCmrLeads = (state, { leads }) =>
  state.merge({ leads })

export const getListUserTasks = (state, { tasks }) =>
  state.merge({ tasks })

export const getSingleLead = (state, { lead }) =>
  state.merge({ lead })

export const getListTimeLines = (state, { timeLines }) =>
  state.merge({ timeLines })

export const getListAppointments = (state, { appointments }) =>
  state.merge({ appointments })

export const getListReplies = (state, { replies }) =>
  state.merge({ replies })

export const getCrmFilterList = (state, { type, leadStatus, leadAssigned, leadSort, sortOrder }) =>
  state.merge({ type, leadStatus, leadAssigned, leadSort, sortOrder })

export const getType = (state, { type }) =>
  state.merge({ type })

export const getLeadStatus = (state, { leadStatus }) =>
  state.merge({ leadStatus })

export const getLeadAssigned = (state, { leadAssigned }) =>
  state.merge({ leadAssigned })

export const getLeadSort = (state, { leadSort }) =>
  state.merge({ leadSort })

export const getSortOrder = (state, { sortOrder }) =>
  state.merge({ sortOrder })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CMR_LEADS]: getCmrLeads,
  [Types.GET_LIST_APPOINTMENTS]: getListAppointments,
  [Types.GET_LIST_REPLIES]: getListReplies,
  [Types.GET_CRM_FILTER_LIST]: getCrmFilterList,
  [Types.GET_TYPE]: getType,
  [Types.GET_SOURCE]: getSource,
  [Types.GET_LEAD_STATUS]: getLeadStatus,
  [Types.GET_LEAD_ASSIGNED]: getLeadAssigned,
  [Types.GET_LEAD_SORT]: getLeadSort,
  [Types.GET_SORT_ORDER]: getSortOrder,
  [Types.GET_SINGLE_LEAD]: getSingleLead,
  [Types.GET_LIST_TIME_LINES]: getListTimeLines,
  [Types.GET_LIST_USER_TASKS]: getListUserTasks,
  [Types.GET_LEAD_DTO]: getLeadDto,
  [Types.GET_TASK_TYPE]: getTaskType,
  [Types.GET_LEAD_STATUSS]: getLeadStatuss,
  [Types.GET_TEMPERATURE]: getTemperature,
  [Types.GET_CREDIT_APPLICATION_DTO]: getCreditApplicationDto
})

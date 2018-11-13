// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://dcapi.dealerscloud.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setToken = (token) => api.setHeader('Authorization', 'Bearer ' + token)

  // auth
  const postToken = (auth) => api.post('token', `username=${auth.username}&password=${auth.password}&DealershipID=11&grant_type=password`)

  // inventory
  const getVehicles = () => api.get(`api/Vehicle/GetAllVehicles?DealershipID=11&VIN=&StockNumber=&ModelYear=&MakeID=&ModelID=`)

  const getVehicleInformation = (vin) => api.post(`api/Vehicle/VINDecode?DealershipID=11&VIN=${vin}&StockPrefix=""&Evaluation=false`)

  const getVehicleNada = (vehicleId, vin, mileage) => api.get(`api/Vehicle/GetVehicleNADAData?DealershipID=11&VehicleID=${vehicleId}&VIN=${vin}&Mileage=${mileage}&UID=`)

  const getSingleVehicle = (id) => api.get(`api/Vehicle/GetOneVehicle?DealershipID=11&Id=${id}`)

  const getVehicleOptions = (dealershipId) => api.get(`api/Vehicle/GetOptions?DealershipID=${dealershipId}`)

  const saveVehicleDTO = (vehicleDTO, userID) => api.post(`api/Vehicle/SaveVehicle?DealershipID=11&UserID=${userID}`, vehicleDTO)

  const getImageVehicle = (id) => api.get(`api/Vehicle/GetVehicleImages?DealershipID=11&id=${id}`)

  const reorderImages = (id, oldPos, newPos) => api.post(`api/Vehicle/ReorderVehicleImages?DealershipID=11&id=${id}&OldPos=${oldPos}&OldPos=${newPos}`)

  const deleteVehicleImage = (id, vehicleId, vin) => api.delete(`api/Vehicle/DeleteVehicleImage?DealershipID=11&id=${id}&VehicleID=${vehicleId}&VIN=${vin}`)

  const postNewImage = (vehicleId, vin, image) => api.post(`api/Vehicle/UploadVehicleImages?DealershipID=11&VehicleID=${vehicleId}&VIN=${vin}`, {image})

  const getDealership = (dealershipListType) => api.get(`api/Vehicle/GetDealershipList?DealershipID=11&_DealershipListType=${dealershipListType}`)

  const getMasterList = (masterListType) => api.get(`api/Vehicle/GetMasterList?_MasterListType=${masterListType}`)

  const getModel = (makeId) => api.get(`api/Vehicle/GetModels?DealershipID=11&MakeID=${makeId}`)

  const getTrim = (modelId) => api.get(`api/Vehicle/GetTrims?ModelID=${modelId}`)

  // Deal
  const saveDeal = (dealDTO) => api.post(`api/Deal/SaveDeal?DealershipID=11`, {dealDTO})

  const getDeals = (dealFilter) => api.post(`api/Deal/GetDeals?DealershipID=11`, {dealFilter})

  const getDeal = (dealID) => api.get(`api/Deal/GetDeal?DealershipID=11&DealID=${dealID}`)

  const updateDeal = (deal) => api.post(`api/Deal/UpdateDeal?DealershipID=11`, {deal})

  const getDealSearchVehicle = (vehicleID) => api.get(`api/Deal/GetDealSearchVehicle?DealershipID=11&VehicleID=${vehicleID}`)

  const updateDealVehicle = (dealID, vehicleID, includeWorking) => api.post(`api/Deal/UpdateDealVehicle?DealershipID=11&DealID=${dealID}&VehicleID=${vehicleID}&IncludeWorking=${includeWorking}`)

  const updateDealStatus = (dealID, dealStatusID, includeWorking) => api.post(`api/Deal/UpdateDealStatus?DealershipID=11&DealID=${dealID}&DealStatusID=${dealStatusID}&IncludeWorking=${includeWorking}`)

  const getDealAnalysis = (dealID) => api.get(`api/Deal/GetDealAnalysis?DealershipID=11&DealID=${dealID}`)

  const updateDealBHPHStatus = (dealID, bHPHStatus) => api.post(`api/Deal/UpdateDealBHPHStatus?DealID=${dealID}&BHPHStatus=${bHPHStatus}`)

  const getDealVantivSummary = (dealID) => api.get(`api/Deal/GetDealVantivSummary?DealershipID=11&DealID=${dealID}`)

  const getVantivAccount = () => api.get(`api/Deal/GetVantivAccount?DealershipID=11`)

  const markAfterMarketProductVoid = (afterMarketProductID, isVoid, voidTransactionID) => api.post(`api/Deal/MarkAfterMarketProductVoid?AfterMarketProductID=${afterMarketProductID}&IsVoid=${isVoid}&VoidTransactionID=${voidTransactionID}`)

  const swapBuyerWithCoBuyer = (dealID) => api.post(`api/Deal/SwapBuyerWithCoBuyer?DealID=${dealID}`)

  const getListDealLog = (dealID) => api.get(`api/Deal/GetDealLog?DealID=${dealID}`)

  const getListDealershipFee = () => api.get(`api/Deal/GetDealershipFee?DealershipID=11`)

  const getListStateFee = (stateCode) => api.get(`api/Deal/GetStateFee?DealershipID=11&StateCode=${stateCode}`)

  const getListStateTaxes = () => api.get(`api/Deal/GetStateTaxes?DealershipID=11`)

  const getListDealForms = (dealID, locationID) => api.get(`api/Deal/GetDealForms?DealershipID=11&DealID=${dealID}&LocationID=${locationID}`)

  const postDealPrint = (dealPrint) => api.post(`api/Deal/AddDealPrint`, {dealPrint})

  const getListDealsPrint = (dealID, dealFormID) => api.get(`api/Deal/GetDealPrint?DealID=${dealID}&DealFormID=${dealFormID}`)

  const saveVehicleTitleStatus = (vehicleTitleStatus) => api.post(`api/Deal/SaveTitleStatus`, {vehicleTitleStatus})

  const removeVehicleTitleStatus = (vehicleID, titleStatusID) => api.post(`api/Deal/RemoveTitleStatus?VehicleID=${vehicleID}&TitleStatusID=${titleStatusID}`)

  const getVehicleTitleStatus = (vehicleID) => api.get(`api/Deal/GetVehicleTitleStatuses?VehicleID=${vehicleID}`)

  const getListVehicleTitleStatusDTO = () => api.get(`api/Deal/GetTitleStatuses?DealershipID=11`)

  const saveFundingTracking = (dealFundingTracking) => api.post(`api/Deal/SaveFundingTracking`, {dealFundingTracking})

  const removeFundingTracking = (dealID) => api.post(`api/Deal/RemoveFundingTracking?DealID=${dealID}`)

  const getFundingTracking = (dealID) => api.get(`api/Deal/GetFundingTracking?DealID=${dealID}`)

  const saveBHPHPromise = (promise) => api.post(`api/Deal/SaveBHPHPromise`, {promise})

  const removeBHPHPromise = (bHPHPromiseID) => api.post(`api/Deal/RemoveBHPHPromise?BHPHPromiseID=${bHPHPromiseID}`)

  const getListBHPHPromise = (dealID) => api.get(`api/Deal/GetBHPHPromise?DealID=${dealID}`)

  const getListDealPaymentsData = (dealID) => api.get(`api/Deal/GetDealPaymentData?DealID=${dealID}`)

  const calculateVehicleCommission = (vehicleID) => api.post(`api/Deal/CalculateVehicleCommission?VehicleID=${vehicleID}`)

  const calculateDealCommission = (dealID) => api.post(`api/Deal/CalculateDealCommission?DealID=${dealID}`)

  const addVantivTransaction = (vantivTransaction) => api.post(`api/Deal/AddVantivTransaction`, {vantivTransaction})

  const addRouteOneLog = (routeOneLog) => api.post(`api/Deal/AddRouteOneLog`, {routeOneLog})

  const getCustomerID = (conversationID) => api.get(`api/Deal/GetCustomerIDByConversationID?ConversationID=${conversationID}`)

  const addRouteOne = (creditDecision) => api.post(`api/Deal/AddRouteOneCreditDecision`, {creditDecision})

  const getListRouteOne = (customerID) => api.get(`api/Deal/GetRouteOneCreditDecision?CustomerID=${customerID}`)

  const addSiriusXMLog = (vehicleSiriusXM) => api.post(`api/Deal/AddSiriusXMLog`, {vehicleSiriusXM})

  const getListSiriusXMLog = (dealID, vehicleID) => api.get(`api/Deal/GetSiriusXMLog?DealID=${dealID}&VehicleID=${vehicleID}`)

  const saveAfterMarket = (afterMarketProductDefault) => api.post(`api/Deal/SaveAfterMarketProductDefault?DealershipID=11`, {afterMarketProductDefault})

  const getListAfterMarket = () => api.get(`api/Deal/GetAfterMarketProductDefaults?DealershipID=11`)

  const getListAfterMarketFrom = () => api.get(`api/Deal/GetAfterMarketProductFromDefaults?DealershipID=11`)

  // CRM
  const getSearchedCRM = (pageSize, startIndex, cRMSearchFilter) => api.post(`api/CRM/SearchCRMLeads?DealershipID=11&PageSize=${pageSize}&StartIndex=${startIndex}`, {cRMSearchFilter})

  const getListCRM = (pageSize, startIndex, cRMSearchFilter) => api.post(`api/CRM/GetCRMLeads?DealershipID=11&PageSize=${pageSize}&StartIndex=${startIndex}`, {cRMSearchFilter})

  const getListAppointments = (cRMLeadAccess, userID, pageSize, startIndex) => api.get(`api/CRM/GetAppointments?DealershipID=11&CRMLeadAccess=${cRMLeadAccess}&UserID=${userID}&PageSize=${pageSize}&StartIndex=${startIndex}`)

  const getListFolloweups = (cRMLeadAccess, userID, pageSize, startIndex) => api.get(`api/CRM/GetFollowups?DealershipID=11&CRMLeadAccess=${cRMLeadAccess}&UserID=${userID}&PageSize=${pageSize}&StartIndex=${startIndex}`)

  const getListReplies = (cRMLeadAccess, userID, pageSize, startIndex) => api.get(`api/CRM/GetReplies?DealershipID=11&CRMLeadAccess=${cRMLeadAccess}&UserID=${userID}&PageSize=${pageSize}&StartIndex=${startIndex}`)

  const getListTextReplies = (cRMLeadAccess, userID, pageSize, startIndex) => api.get(`api/CRM/GetTextReplies?DealershipID=11&CRMLeadAccess=${cRMLeadAccess}&UserID=${userID}&PageSize=${pageSize}&StartIndex=${startIndex}`)

  const getListLatestCRM = (cRMLeadAccess, userID) => api.get(`api/CRM/GetLatestCRMAction?DealershipID=11&CRMLeadAccess=${cRMLeadAccess}&UserID=${userID}`)

  const getSingleLead = (customerID) => api.get(`api/CRM/GetOneLead?DealershipID=11&CustomerID=${customerID}`)

  const getCRMRecordsCount = (cRMLeadView, userID) => api.get(`api/CRM/GetCRMRecordsCount?DealershipID=11&CRMLeadView=${cRMLeadView}&UserID=${userID}`)

  const updateLeadStatus = (customerID, statusID, assignedToID, sourceID, temperatureID) => api.post(`api/CRM/UpdateLeadStatus?CustomerID=${customerID}&StatusID=${statusID}&AssignedToID=${assignedToID}&SourceID=${sourceID}&TemperatureID=${temperatureID}`)

  const getUserLead = (userID) => api.get(`api/CRM/GetUserLeadAccess?UserID=${userID}`)

  const getLeadDTO = (customerID) => api.get(`api/CRM/GetLeadDTO?DealershipID=11&CustomerID=${customerID}`)

  const updateAppointmentStatus = (interactionID, statusID) => api.post(`api/CRM/UpdateAppointmentStatus?InteractionID=${interactionID}&StatusID=${statusID}`)

  const updateVehicle = (businessID, vehicleID) => api.post(`api/CRM/UpdateVehicle?BusinessID=${businessID}&VehicleID=${vehicleID}`)

  const getLeadQueue = (vehicleLeadID) => api.get(`api/CRM/GetLeadQueue?DealershipID=11&VehicleLeadID=${vehicleLeadID}`)

  const saveLeadQueue = (leadQueue) => api.post(`api/CRM/SaveLeadQueue?DealershipID=11`, {leadQueue})

  const getCreditApplicationListingDTO = (creditApplicationID) => api.get(`api/CRM/GetCreditApplicationDTO?CreditApplicationID=${creditApplicationID}`)

  const getCreditApplicationDTO = (customerID, coBuyerID) => api.get(`api/CRM/GetCreditApplication?DealershipID=11&CustomerID=${customerID}&CoBuyerID=${coBuyerID}`)

  const saveCreditApplication = (creditApplicationDTO) => api.post(`api/CRM/SaveCreditApplication?DealershipID=11`, creditApplicationDTO)

  const getAppraisalRequest = (applicantID) => api.get(`api/CRM/GetAppraisalRequest?DealershipID=11&ApplicantID=${applicantID}`)

  const saveAppraisalRequest = (appraisalRequest) => api.post(`api/CRM/SaveAppraisalRequest?DealershipID=11`, {appraisalRequest})

  const getVehicleLead = (leadCustomerID) => api.get(`api/CRM/GetVehicleLead?DealershipID=11&LeadCustomerID=${leadCustomerID}`)

  const saveVehicleLead = (vehicleLead) => api.post(`api/CRM/SaveVehicleLead?DealershipID=11`, {vehicleLead})

  const saveInteraction = (interaction) => api.post(`api/CRM/SaveInteraction`, {interaction})

  const getListInteractions = (customerID) => api.get(`api/CRM/GetInteractions?CustomerID=${customerID}`)

  const getAppointmentDateTime = (customerID) => api.get(`api/CRM/GetAppointmentDateTime?CustomerID=${customerID}`)

  const saveUserReminder = (userReminder) => api.post(`api/CRM/SaveUserReminder`, {userReminder})

  const deleteNote = (interactionID) => api.delete(`api/CRM/DeleteNote?InteractionID=${interactionID}`)

  const getNote = (noteID) => api.get(`api/CRM/GetNote?NoteID=${noteID}`)

  const getNoteasUserTask = (noteID) => api.get(`api/CRM/GetNoteAsUserTask?NoteID=${noteID}`)

  const getListEmail = () => api.get(`api/CRM/GetEmails`)

  const getEmailMessage = (emailMessageID) => api.get(`api/CRM/GetEmailMessage?EmailMessageID=${emailMessageID}`)

  const getListWishlists = (customerID) => api.get(`api/CRM/GetWishlists?CustomerID=${customerID}`)

  const saveWishlist = (wishlist) => api.post(`api/CRM/SaveWishlist`, {wishlist})

  const getListInterests = (customerID) => api.get(`api/CRM/GetInterests?CustomerID=${customerID}`)

  const saveInterest = (interest) => api.post(`api/CRM/SaveInterest`, {interest})

  const saveCreditApplicationPrint = (creditApplicationPrint) => api.post(`api/CRM/SaveCreditApplicationPrint`, {creditApplicationPrint})

  const saveDealDesk = (dealDesk) => api.post(`api/CRM/SaveDealDesk`, {dealDesk})

  const getDealDesk = (dealDeskID) => api.get(`api/CRM/GetDealDesk?DealDeskID=${dealDeskID}`)

  const getListDealDesking = (customerID) => api.get(`api/CRM/GetDealDesking?CustomerID=${customerID}`)

  const deleteDealDesk = (dealDeskID) => api.delete(`api/CRM/DeleteDealDesk?DealDeskID=${dealDeskID}`)

  const saveUserTask = (userTask) => api.post(`api/CRM/SaveUserTask`, userTask)

  const deleteUserTask = (taskID, userID) => api.delete(`api/CRM/DeleteUserTask?TaskID=${taskID}&UserID=${userID}`)

  const getUserTask = (taskID) => api.get(`api/CRM/GetUserTask?TaskID=${taskID}`)

  const getListUserTasks = (customerID) => api.get(`api/CRM/GetUserTasks?CustomerID=${customerID}`)

  const getListTimelines = (customerID) => api.get(`api/CRM/GetTimelines?CustomerID=${customerID}`)

  const updateTaskAppointmentStatus = (taskID, appointmentStatusID) => api.post(`api/CRM/UpdateTaskAppointmentStatus?TaskID=${taskID}&AppointmentStatusID=${appointmentStatusID}`)

  const getListInteractionTypes = () => api.get(`api/CRM/GetInteractionTypes`)

  const getInteractionTypeByName = (description) => api.get(`api/CRM/GetInteractionTypeByName?Description=${description}`)

  const getListCategoryStatus = (interactionTypeID) => api.get(`api/CRM/GetStatuses?InteractionTypeID=${interactionTypeID}`)

  const getCategoryStatusByInteractionTypeID = (interactionTypeID, description) => api.get(`api/CRM/GetCategoryStatusByInteractionTypeID?InteractionTypeID=${interactionTypeID}&Description=${description}`)

  const getCategoryStatus = (statusID, description, interactionTypeID) => api.get(`api/CRM/GetStatus?StatusID=${statusID}&Description=${description}&InteractionTypeID=${interactionTypeID}`)

  const saveCategoryStatus = (categoryStatus) => api.post(`api/CRM/SaveStatus`, {categoryStatus})

  const deleteCategoryStatus = (statusID) => api.post(`api/CRM/RemoveStatus?StatusID=${statusID}`)

  const getListLeadAssignGroup = () => api.get(`api/CRM/GetAllLeadAssignGroup?DealershipID=11`)

  const getLeadAssignGroup = (groupID) => api.get(`api/CRM/GetLeadAssignGroup?GroupID=${groupID}`)

  const saveLeadAssignGroup = (leadAssignGroup) => api.post(`api/CRM/SaveLeadAssignGroup`, {leadAssignGroup})

  const deleteLeadAssignGroup = (groupID) => api.delete(`api/CRM/DeleteLeadAssignGroup?GroupID=${groupID}`)

  const getLeadAssignSourceUser = (groupID) => api.get(`api/CRM/GetLeadAssignSourceUser?DealershipID=11&GroupID=${groupID}`)

  const getListLeadAssignGroupSource = (groupID) => api.get(`api/CRM/GetAllLeadAssignGroupSource?GroupID=${groupID}`)

  const addLeadAssignGroupSource = (leadAssignGroupSource) => api.post(`api/CRM/AddLeadAssignGroupSource`, {leadAssignGroupSource})

  const updateLeadAssignGroupSource = (leadAssignGroupSource) => api.post(`api/CRM/UpdateLeadAssignGroupSource`, {leadAssignGroupSource})

  const deleteLeadAssignGroupSource = (groupID) => api.delete(`api/CRM/DeleteLeadAssignGroupSource?GroupID=${groupID}`)

  const getListLeadAssignGroupUser = (groupID) => api.get(`api/CRM/GetLeadAssignGroupUser?GroupID=${groupID}`)

  const addLeadAssignGroupUser = (leadAssignGroupUser) => api.post(`api/CRM/AddLeadAssignGroupUser`, {leadAssignGroupUser})

  const updateLeadAssignGroupUser = (leadAssignGroupUser) => api.post(`api/CRM/UpdateLeadAssignGroupUser`, {leadAssignGroupUser})

  const deleteLeadAssignGroupUser = (groupID) => api.delete(`api/CRM/DeleteLeadAssignGroupUser?GroupID=${groupID}`)

  const getListLeadScoreRule = () => api.get(`api/CRM/GetAllLeadScoreRule?DealershipID=11`)

  const getLeadScoreRule = (leadScoreRuleID) => api.get(`api/CRM/GetLeadScoreRule?LeadScoreRuleID=${leadScoreRuleID}`)

  const saveLeadScoreRule = (leadScoreRule) => api.post(`api/CRM/SaveLeadScoreRule`, {leadScoreRule})

  const deleteLeadScoreRule = (leadScoreRuleID) => api.delete(`api/CRM/DeleteLeadScoreRule?LeadScoreRuleID=${leadScoreRuleID}`)

  const getListCustomerRoundRobinActivityTimeout = () => api.get(`api/CRM/GetCustomerRoundRobinActivityTimeout`)

  const updateCustomerRoundRobinActivityTimeout = (customerID) => api.post(`api/CRM/UpdateCustomerRoundRobinActivityTimeout?CustomerID=${customerID}`)

  const addCampaign = (campaign) => api.post(`api/CRM/AddCompaign`, {campaign})

  const getCompaignForEmail = (campaignID) => api.get(`api/CRM/GetCompaignForEmail?CampaignID=${campaignID}`)

  const transferLeads = (employeeFromID, employeeToID) => api.post(`api/CRM/TransferLeads?DealershipID=11&EmployeeFromID=${employeeFromID}&EmployeeToID=${employeeToID}`)

  const mergeLeads = (leadFromID, leadToID) => api.post(`api/CRM/MergeLeads?DealershipID=11&LeadFromID=${leadFromID}&LeadToID=${leadToID}`)

  const getCRMFilterList = (_CRMFilterType) => api.get(`api/CRM/GetCRMFilterList?DealershipID=11&_CRMFilterType=${_CRMFilterType}`)

  const getLeadStatus = () => api.get(`api/CRM/GetLeadStatus`)
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    postToken,
    setToken,
    getVehicles,
    getVehicleInformation,
    getVehicleNada,
    getSingleVehicle,
    getVehicleOptions,
    saveVehicleDTO,
    getImageVehicle,
    reorderImages,
    deleteVehicleImage,
    postNewImage,
    getDealership,
    getMasterList,
    getModel,
    getTrim,
    saveDeal,
    getDeals,
    getDeal,
    updateDeal,
    updateDealVehicle,
    updateDealStatus,
    getDealAnalysis,
    updateDealBHPHStatus,
    getDealVantivSummary,
    getVantivAccount,
    markAfterMarketProductVoid,
    swapBuyerWithCoBuyer,
    getListDealLog,
    getListDealershipFee,
    getListStateFee,
    getListStateTaxes,
    getListDealForms,
    postDealPrint,
    getListDealsPrint,
    saveVehicleTitleStatus,
    removeVehicleTitleStatus,
    getVehicleTitleStatus,
    getListVehicleTitleStatusDTO,
    saveFundingTracking,
    removeFundingTracking,
    getFundingTracking,
    saveBHPHPromise,
    removeBHPHPromise,
    getListBHPHPromise,
    getListDealPaymentsData,
    calculateVehicleCommission,
    calculateDealCommission,
    addVantivTransaction,
    addRouteOneLog,
    getCustomerID,
    addRouteOne,
    getListRouteOne,
    addSiriusXMLog,
    getListSiriusXMLog,
    saveAfterMarket,
    getListAfterMarket,
    getListAfterMarketFrom,
    getSearchedCRM,
    getListCRM,
    getListAppointments,
    getListFolloweups,
    getListReplies,
    getListTextReplies,
    getListLatestCRM,
    getSingleLead,
    getCRMRecordsCount,
    updateLeadStatus,
    getUserLead,
    getLeadDTO,
    updateAppointmentStatus,
    updateVehicle,
    getLeadQueue,
    saveLeadQueue,
    getCreditApplicationListingDTO,
    getCreditApplicationDTO,
    saveCreditApplication,
    getAppraisalRequest,
    saveAppraisalRequest,
    getVehicleLead,
    saveVehicleLead,
    saveInteraction,
    getListInteractions,
    getAppointmentDateTime,
    saveUserReminder,
    deleteNote,
    getNote,
    getNoteasUserTask,
    getListEmail,
    getEmailMessage,
    getListWishlists,
    saveWishlist,
    saveInterest,
    saveCreditApplicationPrint,
    saveDealDesk,
    getDealDesk,
    getListDealDesking,
    deleteDealDesk,
    saveUserTask,
    deleteUserTask,
    getUserTask,
    getListUserTasks,
    getListTimelines,
    updateTaskAppointmentStatus,
    getListInteractionTypes,
    getInteractionTypeByName,
    getListCategoryStatus,
    getCategoryStatusByInteractionTypeID,
    getCategoryStatus,
    saveCategoryStatus,
    deleteCategoryStatus,
    getListLeadAssignGroup,
    getLeadAssignGroup,
    saveLeadAssignGroup,
    deleteLeadAssignGroup,
    getLeadAssignSourceUser,
    getListLeadAssignGroupSource,
    addLeadAssignGroupSource,
    updateLeadAssignGroupSource,
    deleteLeadAssignGroupSource,
    getListLeadAssignGroupUser,
    addLeadAssignGroupUser,
    updateLeadAssignGroupUser,
    deleteLeadAssignGroupUser,
    getListLeadScoreRule,
    getLeadScoreRule,
    saveLeadScoreRule,
    deleteLeadScoreRule,
    getListCustomerRoundRobinActivityTimeout,
    updateCustomerRoundRobinActivityTimeout,
    addCampaign,
    getCompaignForEmail,
    transferLeads,
    mergeLeads,
    getListInterests,
    getCRMFilterList,
    getLeadStatus,
    getDealSearchVehicle
  }
}

// let's return back our create method as the default.
export default {
  create
}

const PREFIX = 'ctl00_ctl00_CPContent_CPMain'

export const STRING_FIELD_IDS = [
  `${PREFIX}_ddlAgeMin`,
  `${PREFIX}_ddlAgeDaysMin`,
  `${PREFIX}_ddlAgeMax`,
  `${PREFIX}_ddlAgeDaysMax`,
  `${PREFIX}_ddlSkillSearchType`,
  `${PREFIX}_ddlSkill1`,
  `${PREFIX}_ddlSkill1Min`,
  `${PREFIX}_ddlSkill1Max`,
  `${PREFIX}_ddlSkill2`,
  `${PREFIX}_ddlSkill2Min`,
  `${PREFIX}_ddlSkill2Max`,
  `${PREFIX}_ddlSkill3`,
  `${PREFIX}_ddlSkill3Min`,
  `${PREFIX}_ddlSkill3Max`,
  `${PREFIX}_ddlSkill4`,
  `${PREFIX}_ddlSkill4Min`,
  `${PREFIX}_ddlSkill4Max`,
  `${PREFIX}_txtBidMax`,
  `${PREFIX}_ddlBornIn`,
  `${PREFIX}_ddlContinent`,
  `${PREFIX}_txtTSIMin_text`,
  `${PREFIX}_txtTSIMax_text`,
  `${PREFIX}_txtSalaryMin`,
  `${PREFIX}_txtSalaryMax`,
  `${PREFIX}_txtTransferCompareAvgMin`,
  `${PREFIX}_txtTransferCompareAvgMax`,
  `${PREFIX}_ddlGlobalSkillMax`,
] as const satisfies string[]

export const BOOLEAN_FIELD_IDS = [
  `${PREFIX}_chkSpecialty1`,
  `${PREFIX}_chkSpecialty2`,
  `${PREFIX}_chkSpecialty3`,
  `${PREFIX}_chkSpecialty4`,
  `${PREFIX}_chkSpecialty5`,
  `${PREFIX}_chkSpecialty6`,
  `${PREFIX}_chkSpecialty8`,
  `${PREFIX}_chkSpecialty0`,
  `${PREFIX}_chkUseGlobalMax`,
] as const satisfies string[]

export const RADIO_FIELD_NAMES = ['ctl00$ctl00$CPContent$CPMain$rdSort'] as const satisfies string[]

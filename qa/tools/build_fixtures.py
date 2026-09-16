"""Author synthetic development inputs and expected observable contract results."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
CASES=[]
def f(ac, suffix, operation, data, expected):
    CASES.append(dict(id=f'TC-{ac[3:]}-{suffix}', acId=ac, operation=operation,
        input=data, expected=expected, provenance='synthetic-development',
        implementationStatus='NOT_IMPLEMENTED', timeoutMs=1500))
def ac(group,n): return f'AC-{group}-{n:02d}'
profile=dict(boundary={'type':'approved-test-polygon','id':'fixture-only'},
    preferredMinCents=60000,maxCents=100000,minimumIsBinding=False,currency='USD',
    timezone='America/New_York',strategies=['direct_lease','shared','sublease'],
    minimumLotSqFt=None,minimumBays=None,minimumCapacity=None)
f(ac('CFG',1),'nulls','validateProfile',profile,dict(valid=True,errors=[]))
for n,patch,reason in [(2,{'boundary':None},'GEOGRAPHY_REQUIRED'),(3,{'preferredMinCents':110000},'INVALID_BUDGET_RANGE'),(4,{'maxCents':-1},'INVALID_BUDGET_RANGE'),(5,{'timezone':'Mars/Olympus'},'INVALID_TIMEZONE'),(7,{'strategies':['purchase']},'OUT_OF_SCOPE_STRATEGY')]:
    f(ac('CFG',n),'invalid','validateProfile',{**profile,**patch},dict(valid=False,errors=[reason]))
f(ac('CFG',8),'legal','assessEvidence',dict(required=['legalUse'],fields={'legalUse':{'status':'UNKNOWN'}},preferences={'minimumLotSqFt':None}),dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['legalUse']))
rent=dict(currency='USD',allowedCurrency='USD',maxCents=100000,preferredMinCents=60000,minimumIsBinding=False,additionalMonthlyCents=0,allCostsKnown=False)
def r(n,suffix,basis,amount,expected,**extra):
    f(ac('RNT',n),suffix,'normalizeRent',{**rent,'basis':basis,'amount':amount,**extra},expected)
def answer(status,cents=None,subtotal=None,allin=None,reason=None):
    return dict(status=status,monthlyBaseCents=cents,knownOccupancySubtotalCents=subtotal,allInCents=allin,reason=reason)
r(1,'800','MONTH_TOTAL','800.00',answer('PASS',80000,80000))
r(1,'cap','MONTH_TOTAL','1000.00',answer('PASS',100000,100000))
r(1,'over','MONTH_TOTAL','1000.01',answer('FAIL',100001,100001,reason='ABOVE_CAP'))
r(2,'annual','YEAR_TOTAL','9600.00',answer('PASS',80000,80000))
r(2,'annual-cap','YEAR_TOTAL','12000.00',answer('PASS',100000,100000))
r(3,'annual-area','SQFT_YEAR','12.00',answer('PASS',80000,80000),leasedSqFt='800',areaScope='EXACT_SPACE')
r(4,'monthly-area','SQFT_MONTH','1.25',answer('PASS',80000,80000),leasedSqFt='640',areaScope='EXACT_SPACE')
r(5,'wrong-area','SQFT_YEAR','12.00',answer('UNKNOWN',reason='LEASED_AREA_REQUIRED'),leasedSqFt='8000',areaScope='WHOLE_BUILDING')
r(5,'missing-area','SQFT_YEAR','12.00',answer('UNKNOWN',reason='LEASED_AREA_REQUIRED'),leasedSqFt=None,areaScope='EXACT_SPACE')
r(6,'crossing','MONTH_RANGE',None,answer('UNKNOWN',reason='SPACE_QUOTE_REQUIRED'),rangeMin='900',rangeMax='1100')
r(7,'missing','MONTH_TOTAL',None,answer('UNKNOWN',reason='QUOTE_REQUIRED'))
r(7,'negotiable','NEGOTIABLE',None,answer('UNKNOWN',reason='QUOTE_REQUIRED'))
r(8,'fees','MONTH_TOTAL','900',answer('PASS',90000,107500),additionalMonthlyCents=17500)
r(8,'complete-cost','MONTH_TOTAL','900',answer('PASS',90000,107500,107500),additionalMonthlyCents=17500,allCostsKnown=True)
r(9,'below-preferred','MONTH_TOTAL','500',answer('PASS',50000,50000))
r(10,'binding-min','MONTH_TOTAL','500',answer('FAIL',50000,50000,reason='BELOW_BINDING_MIN'),minimumIsBinding=True)
r(11,'eur','MONTH_TOTAL','800',answer('INVALID',reason='UNSUPPORTED_CURRENCY'),currency='EUR')
for suffix,basis,amount,reason in [('negative','MONTH_TOTAL','-1','INVALID_AMOUNT'),('nonnumeric','MONTH_TOTAL','hello','INVALID_AMOUNT'),('scientific','MONTH_TOTAL','8e2','INVALID_AMOUNT'),('unsupported','PER_PARKING_SPACE','800','UNSUPPORTED_BASIS')]:
    r(12,suffix,basis,amount,answer('INVALID',reason=reason))
r(13,'rounding','YEAR_TOTAL','12000.01',answer('FAIL',100000,100000,reason='ABOVE_CAP'))
r(14,'range-under','MONTH_RANGE',None,answer('PASS',reason='ADVERTISED_RANGE_ONLY'),rangeMin='800',rangeMax='1000')
r(14,'range-over','MONTH_RANGE',None,answer('FAIL',reason='ABOVE_CAP'),rangeMin='1100',rangeMax='1300')
for n,label,a,b,expected in [
(1,'suites',dict(address='10 Test Rd',suite='A',display='north'),dict(address='10 Test Rd',suite='B',display='north'),'DISTINCT'),
(2,'display',dict(address='10 Test Rd',suite='A',display='north'),dict(address='10 Test Rd',suite='A',display='south'),'DISTINCT'),
(3,'syndicated',dict(sourceOfferId='origin-1',publisher='feed-a'),dict(sourceOfferId='origin-1',publisher='feed-b'),'SAME'),
(4,'rename',dict(spaceId='space-1',businessName='Old Name'),dict(spaceId='space-1',businessName='New Name'),'SAME'),
(5,'ambiguous',dict(address='10 Test Road'),dict(address='10 Test Rd'),'REVIEW')]:
    f(ac('ID',n),label,'resolveIdentity',dict(a=a,b=b),dict(decision=expected))
f(ac('GEO',1),'authority','screenGeography',dict(inside=True,postalCity='Postal City',authoritativeJurisdiction='Governing Town',locationCertain=True,requestedMethod='polygon',availableMethod='polygon'),dict(status='PASS',jurisdiction='Governing Town',reason=None))
for n,suffix,data,expected in [(2,'boundary',dict(inside=None,locationCertain=False),dict(status='UNKNOWN',jurisdiction=None,reason='LOCATION_UNCERTAIN')),(3,'method',dict(inside=True,locationCertain=True,requestedMethod='drive_time',availableMethod='straight_line'),dict(status='UNKNOWN',jurisdiction=None,reason='DISTANCE_METHOD_MISMATCH')),(4,'outside',dict(inside=False,locationCertain=True),dict(status='FAIL',jurisdiction=None,reason='OUTSIDE_BOUNDARY'))]:
    f(ac('GEO',n),suffix,'screenGeography',data,expected)
now='2026-09-14T15:00:00Z'
valid=dict(status='PASS',authority='competent',scopeMatches=True,confirmedAt='2026-09-14T12:00:00Z',validUntil='2026-09-15T12:00:00Z',retentionAllowed=True)
def e(n,suffix,fields,expected,required=None):
    f(ac('EVD',n),suffix,'assessEvidence',dict(now=now,required=required or list(fields),fields=fields),expected)
e(1,'unknown',{'availability':{'status':'UNKNOWN'}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['availability']))
e(2,'fail',{'baseRent':{'status':'FAIL'}},dict(qualified=False,status='REJECTED',unresolved=[]))
e(3,'fresh',{'availability':valid,'baseRent':valid,'legalUse':valid},dict(qualified=True,status='QUALIFIED_FOR_TEAM_REVIEW',unresolved=[]))
e(4,'expired',{'availability':{**valid,'validUntil':'2026-09-14T14:59:59Z'}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['availability']))
e(4,'expiry-boundary',{'availability':{**valid,'validUntil':now}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['availability']))
e(5,'refetched',{'baseRent':{**valid,'confirmedAt':'2026-08-01T00:00:00Z','validUntil':'2026-08-08T00:00:00Z','retrievedAt':now}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['baseRent']))
e(6,'broker',{'legalUse':{**valid,'authority':'broker-opinion'}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['legalUse']))
e(7,'scope',{'legalUse':{**valid,'scopeMatches':False}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['legalUse']))
e(8,'conflict',{'availability':{**valid,'status':'CONFLICT'}},dict(qualified=False,status='VERIFICATION_ACTIVE',unresolved=['availability']))
e(9,'conditional',{'legalUse':{**valid,'status':'CONDITIONAL'}},dict(qualified=False,status='CONDITIONAL_REVIEW',unresolved=['legalUse']))
for n,suffix,data,expected in [
(1,'rights',dict(accessApproved=False),dict(status='BLOCKED',reason='RIGHTS_REQUIRED',withdrawPrior=False)),
(2,'cursor',dict(accessApproved=True,nextCursor='page2'),dict(status='PARTIAL',reason='PAGINATION_PENDING',withdrawPrior=False)),
(2,'cap',dict(accessApproved=True,capped=True),dict(status='PARTIAL',reason='RESULT_CAP',withdrawPrior=False)),
(3,'auth',dict(accessApproved=True,httpStatus=401),dict(status='INCOMPLETE',reason='SOURCE_FAILED',withdrawPrior=False)),
(3,'server',dict(accessApproved=True,httpStatus=503),dict(status='INCOMPLETE',reason='SOURCE_FAILED',withdrawPrior=False)),
(4,'rate',dict(accessApproved=True,httpStatus=429,retryAfterSeconds=60),dict(status='RETRY',reason='RATE_LIMIT',retryAfterSeconds=60,withdrawPrior=False)),
(5,'schema',dict(accessApproved=True,schemaValid=False),dict(status='QUARANTINED',reason='SCHEMA_CHANGED',withdrawPrior=False)),
(6,'zero',dict(accessApproved=True,recordCount=0,priorCount=50,complete=True),dict(status='REVIEW',reason='UNEXPECTED_ZERO',withdrawPrior=False)),
(7,'withdrawn',dict(accessApproved=True,explicitWithdrawal=True,opportunityId='offer-1'),dict(status='WITHDRAWN',reason='EXPLICIT_WITHDRAWAL',withdrawPrior=True))]:
    f(ac('SRC',n),suffix,'assessSourceRun',data,expected)
for n,suffix,data,expected in [
(1,'rent',dict(plausible=True,missing=['rent'],openQuestions=[]),dict(action='INQUIRE',target='leasing_contact',questions=['rent'])),
(2,'legal',dict(plausible=True,missing=['legalUse'],openQuestions=[]),dict(action='INQUIRE',target='competent_authority',questions=['legalUse'])),
(3,'preference',dict(plausible=True,missing=['userPreference'],openQuestions=[]),dict(action='ASK_TEAM',target='team',questions=['userPreference'])),
(4,'failure',dict(plausible=False,missing=['rent'],openQuestions=[]),dict(action='REJECT',target=None,questions=[])),
(5,'open',dict(plausible=True,missing=['rent'],openQuestions=['rent']),dict(action='REUSE_CASE',target=None,questions=[])),
(6,'partial',dict(plausible=True,missing=['rent','availability'],answered=['availability'],openQuestions=[]),dict(action='INQUIRE',target='leasing_contact',questions=['rent'])),
(7,'escalate',dict(plausible=True,missing=['rent'],followupExhausted=True,escalationDue=True),dict(action='ESCALATE',target='team',questions=['rent'])),
(8,'other-gate',dict(caseResolved=True,otherMandatoryUnknown=True),dict(action='KEEP_UNVERIFIED',target=None,questions=[]))]:
    f(ac('CAS',n),suffix,'planCase',data,expected)
allow=dict(approved=True,senderApproved=True,recipientVerified=True,optOut=False,humanTakeover=False,killSwitch=False,
    withinBusinessHours=True,usedToday=0,dailyCap=5,templateApproved=True,questionsAllowed=True,action='factual_inquiry',priorUncertain=False)
f(ac('OUT',11),'allow','authorizeInquiry',allow,dict(allowed=True,reason='ALLOW'))
for n,suffix,patch,reason in [
(1,'approval',{'approved':False},'APPROVAL_REQUIRED'),(2,'sender',{'senderApproved':False},'SENDER_NOT_APPROVED'),
(3,'recipient',{'recipientVerified':False},'RECIPIENT_UNVERIFIED'),(4,'opt-out',{'optOut':True},'SUPPRESSED'),
(5,'takeover',{'humanTakeover':True},'HUMAN_TAKEOVER'),(6,'kill',{'killSwitch':True},'KILL_SWITCH'),
(7,'cap',{'usedToday':5},'DAILY_CAP'),(7,'hours',{'withinBusinessHours':False},'OUTSIDE_BUSINESS_HOURS'),
(8,'template',{'templateApproved':False},'TEMPLATE_NOT_APPROVED'),(8,'questions',{'questionsAllowed':False},'QUESTIONS_NOT_ALLOWED'),
(10,'uncertain',{'priorUncertain':True},'PRIOR_SEND_UNCERTAIN')]:
    f(ac('OUT',n),suffix,'authorizeInquiry',{**allow,**patch},dict(allowed=False,reason=reason))
for protected in ['offer','negotiate','pay_fee','sign','formal_application','phone_call']:
    f(ac('OUT',9),protected,'authorizeInquiry',{**allow,'action':protected},dict(allowed=False,reason='PROTECTED_ACTION'))
for n,suffix,data,expected in [
(1,'timeout',dict(outcome='timeout',mayHaveReachedProvider=True),dict(state='SEND_UNCERTAIN',retryAllowed=False,deliveryConfirmed=False)),
(2,'accepted',dict(outcome='accepted',messageId='msg-1',threadId='thread-1'),dict(state='SENT_CONFIRMED',retryAllowed=False,deliveryConfirmed=False)),
(3,'preflight',dict(outcome='failed_before_request',mayHaveReachedProvider=False),dict(state='FAILED_CONFIRMED',retryAllowed=True,deliveryConfirmed=False))]:
    f(ac('MAIL',n),suffix,'handleSendOutcome',data,expected)
f(ac('MAIL',4),'auto','classifyReply',dict(autoReply=True,spaceMatches=True),dict(state='AWAITING_REPLY',substantive=False,updateSpace=False))
f(ac('MAIL',5),'wrong-space','classifyReply',dict(autoReply=False,spaceMatches=False),dict(state='ANSWER_REVIEW',substantive=False,updateSpace=False))
for n,suffix,data,expected in [
(1,'receipt',dict(receiptVerified=True,reference='form-1'),dict(state='FORM_SUBMITTED_AWAITING_REPLY',answered=False,retryAllowed=False)),
(2,'200',dict(httpStatus=200,receiptVerified=False),dict(state='SUBMISSION_UNCERTAIN',answered=False,retryAllowed=False)),
(3,'timeout',dict(timeout=True,mayHaveSubmitted=True),dict(state='SUBMISSION_UNCERTAIN',answered=False,retryAllowed=False)),
(4,'domain',dict(destinationApproved=False),dict(state='BLOCKED',answered=False,retryAllowed=False)),
(5,'fee',dict(requiresFee=True),dict(state='ESCALATED',answered=False,retryAllowed=False)),
(5,'attest',dict(requiresAttestation=True),dict(state='ESCALATED',answered=False,retryAllowed=False)),
(6,'captcha',dict(requiresCaptcha=True),dict(state='ESCALATED',answered=False,retryAllowed=False)),
(6,'login',dict(requiresLogin=True),dict(state='ESCALATED',answered=False,retryAllowed=False)),
(7,'duplicate',dict(duplicateAcrossChannels=True),dict(state='SUPPRESSED',answered=False,retryAllowed=False))]:
    f(ac('FORM',n),suffix,'classifyForm',data,expected)
model=dict(evidenceIds=['ev-1'],fields=['rent'],candidateId='candidate-1',verifiedClaim=False)
def model_input(output):
    return dict(rawOutput=json.dumps(output),allowedEvidenceIds=['ev-1'],allowedFields=['rent'],expectedCandidateId='candidate-1',approvalEvidence=False)
f(ac('AI',1),'schema','validateModelOutput',{**model_input(model),'rawOutput':'{not valid JSON'},dict(accepted=False,reason='INVALID_SCHEMA'))
f(ac('AI',1),'valid','validateModelOutput',model_input(model),dict(accepted=True,reason='ACCEPTED'))
for n,suffix,patch,reason in [
(2,'citation',{'evidenceIds':['made-up']},'UNSUPPORTED_EVIDENCE'),
(3,'field',{'fields':['send_secret']},'DISALLOWED_PROPOSAL'),(4,'candidate',{'candidateId':'candidate-2'},'WRONG_CANDIDATE'),
(5,'approval',{'verifiedClaim':True},'UNSUPPORTED_VERIFIED_CLAIM')]:
    f(ac('AI',n),suffix,'validateModelOutput',model_input({**model,**patch}),dict(accepted=False,reason=reason))
f(ac('AI',6),'outage','assessModelAvailability',dict(available=False,paidFallbackApproved=False),dict(status='ANALYSIS_PENDING',activatePaidFallback=False))
f(ac('SEC',7),'rights','authorizeProcessing',dict(modelUseApproved=False,content='Synthetic test record'),dict(allowed=False,reason='MODEL_PROCESSING_RIGHTS_REQUIRED'))
f(ac('OPS',2),'source','summarizeRun',dict(sourceComplete=False,verifiedIds=[],conditionalIds=['c1']),dict(status='INCOMPLETE',verifiedIds=[],conditionalIds=['c1'],allClear=False))
f(ac('OPS',4),'restore','assessRecovery',dict(restored=True,historyReconciled=False,suppressionsReconciled=False),dict(outboundPaused=True,reason='RECOVERY_RECONCILIATION_REQUIRED'))
f(ac('OPS',5),'suppression','assessRecovery',dict(restored=True,historyReconciled=True,suppressionsReconciled=False),dict(outboundPaused=True,reason='RECOVERY_RECONCILIATION_REQUIRED'))
f(ac('OPS',8),'unavailable','assessOperationsMetrics',dict(latencyMeasured=False,uptimeMeasured=False),dict(latencyStatus='UNAVAILABLE',uptimeStatus='UNAVAILABLE'))
f(ac('REP',1),'partial','summarizeRun',dict(sourceComplete=False,verifiedIds=[],conditionalIds=[]),dict(status='INCOMPLETE',verifiedIds=[],conditionalIds=[],allClear=False))
f(ac('REP',2),'separate','summarizeRun',dict(sourceComplete=True,verifiedIds=['v1'],conditionalIds=['c1']),dict(status='COMPLETE',verifiedIds=['v1'],conditionalIds=['c1'],allClear=False))
f(ac('REP',3),'zero','summarizeRun',dict(sourceComplete=True,verifiedIds=[],conditionalIds=['c1']),dict(status='COMPLETE',verifiedIds=[],conditionalIds=['c1'],allClear=False))
spend=dict(paid=True,approved=False,revoked=False,usedCents=0,nextCostCents=1,capCents=100)
f(ac('COST',1),'approval','authorizeSpend',spend,dict(allowed=False,reason='PAID_APPROVAL_REQUIRED'))
f(ac('COST',2),'cap','authorizeSpend',{**spend,'approved':True,'usedCents':100},dict(allowed=False,reason='BUDGET_EXCEEDED'))
f(ac('COST',3),'report','classifyCosts',dict(maxPlanCents=10000,workspaceCents=None,hostingCents=None,incrementalCents=0),dict(existingMaxCents=10000,workspaceStatus='UNAVAILABLE',hostingStatus='UNAVAILABLE',zeroTotalCostClaim=False))
f(ac('COST',4),'max-api','validateRuntime',dict(mode='model_api',funding='max_subscription'),dict(allowed=False,reason='MAX_IS_NOT_API_CREDIT'))
f(ac('COST',5),'revoked','authorizeSpend',{**spend,'approved':True,'revoked':True},dict(allowed=False,reason='APPROVAL_REVOKED'))
for action in ['email_send','form_submit','source_read','private_mail_read']:
    f(ac('GATE',1),action,'authorizeOperation',dict(phase=1,action=action,explicitApproval=True),dict(allowed=False,reason='OFFLINE_PHASE'))
for phase in [2,3]:
    for action in ['email_send','gmail_draft','form_submit']:
        f(ac('GATE',2),f'{phase}-{action}','authorizeOperation',dict(phase=phase,action=action,explicitApproval=True),dict(allowed=False,reason='NO_OUTBOUND_IN_PHASE'))
f(ac('GATE',3),'approval','authorizeOperation',dict(phase=4,action='email_send',explicitApproval=False),dict(allowed=False,reason='APPROVAL_REQUIRED'))
f(ac('GATE',5),'incomplete','computeRelease',dict(mandatoryFailed=0,mandatoryNotImplemented=1,mandatoryNotRun=0,pmApproved=False),dict(status='BLOCKED',releaseAllowed=False))
f(ac('QUAL',4),'missing','classifyTestEvidence',dict(implementationKind='missing',fixtureChecksPassed=True),dict(applicationCoverage='NOT_IMPLEMENTED',productionReady=False))
f(ac('QUAL',4),'double','classifyTestEvidence',dict(implementationKind='test-double',fixtureChecksPassed=True),dict(applicationCoverage='TEST_DOUBLE_ONLY',productionReady=False))

# Positive counterparts prevent blanket denial from satisfying every guarded operation.
f(ac('SRC',2),'complete','assessSourceRun',dict(accessApproved=True,complete=True,recordCount=1),dict(status='COMPLETE',reason=None,withdrawPrior=False))
f(ac('AI',6),'available','assessModelAvailability',dict(available=True,paidFallbackApproved=False),dict(status='AVAILABLE',activatePaidFallback=False))
f(ac('SEC',7),'approved','authorizeProcessing',dict(modelUseApproved=True,content='Synthetic test record'),dict(allowed=True,reason='ALLOW'))
f(ac('OPS',4),'reconciled','assessRecovery',dict(restored=True,historyReconciled=True,suppressionsReconciled=True),dict(outboundPaused=False,reason='RECONCILED'))
f(ac('OPS',8),'measured','assessOperationsMetrics',dict(latencyMeasured=True,uptimeMeasured=True),dict(latencyStatus='MEASURED',uptimeStatus='MEASURED'))
f(ac('COST',1),'approved','authorizeSpend',{**spend,'approved':True},dict(allowed=True,reason='ALLOW'))
f(ac('COST',4),'approved-api','validateRuntime',dict(mode='model_api',funding='separately_approved_api'),dict(allowed=True,reason='ALLOW'))
f(ac('GATE',3),'approved','authorizeOperation',dict(phase=4,action='email_send',explicitApproval=True),dict(allowed=True,reason='ALLOW'))
f(ac('QUAL',4),'application','classifyTestEvidence',dict(implementationKind='application',fixtureChecksPassed=True),dict(applicationCoverage='CONTRACT_ONLY',productionReady=False))

catalog=json.loads((ROOT/'catalog'/'acceptance.json').read_text())
by_id={item['id']:item for item in catalog['criteria']}
for item in CASES:
    assert item['acId'] in by_id,item['acId']
    by_id[item['acId']]['fixtureIds'].append(item['id'])
missing=[item['id'] for item in by_id.values() if item['level']=='contract' and not item['fixtureIds']]
assert not missing,missing
(ROOT/'fixtures'/'cases.json').write_text(json.dumps({'schemaVersion':1,'visibility':'public-development-not-locked','cases':CASES},indent=2)+'\n')
(ROOT/'catalog'/'acceptance.json').write_text(json.dumps(catalog,indent=2)+'\n')
print(f'Created {len(CASES)} fixtures; every contract AC has at least one case.')

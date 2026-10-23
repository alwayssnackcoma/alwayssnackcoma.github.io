/** Browser-only dialogue. No network requests, keys, or saved visitor history. */
export const STORY_SECONDS = 180;
export const MAX_REPLIES = 15;
export type DialogueState = {turn:number;lastTopic:string;uses:Record<string,number>};
export function newDialogue():DialogueState{return {turn:0,lastTopic:'',uses:{}}}
type Topic={id:string;match:RegExp;replies:string[]};
const topics:Topic[]=[
{id:'danger',match:/죽고\s*싶|자살|자해|살기\s*싫/,replies:['지금 혼자 있어?\n가까운 사람한테 같이 있어 달라고 하자. 당장 위험하면 119에 전화해.']},
{id:'rumor',match:/열애|실트|알계|트위터|기사|들켰|소문|팬들/,replies:['그거 보고 연락한 거야?\n혼자 신경 쓰고 있었어?','아직 일어나지도 않은 일까지 걱정하지 마\n궁금한 건 나한테 물어봐','폰 잠깐 내려놔\n나랑 얘기하고 있잖아']},
{id:'not-love',match:/안\s*좋아|좋아하지\s*않|보고\s*싶지\s*않|싫어|연락하지\s*마|그만\s*연락/,replies:['알겠어. 더 장난 안 칠게\n불편했으면 미안','응. 지금은 쉬어\n답장 안 해도 돼']},
{id:'not-meet',match:/못\s*만나|안\s*만나|나가기\s*싫|나가기\s*귀찮|안\s*나가/,replies:['그럼 무리해서 나오지 마\n조금 더 얘기나 하자','응 알겠어\n다음에 보면 되지']},
{id:'not-eaten',match:/안\s*먹|못\s*먹|안\s*먹었|아직.*밥|밥.*아직|굶/,replies:['아직도 안 먹었어?\n간단한 거라도 먹어','나도 아직인데\n같이 메뉴 고를래?','그럼 먹는 것부터 하자\n폰은 안 도망가']},
{id:'miss',match:/보고\s*싶|그리워|만나고\s*싶/,replies:['그거 내가 먼저 말하려고 했는데','지금?\n나도 좀','아 그런 말 하면\n진짜 보러 가고 싶잖아']},
{id:'love',match:/좋아|사랑|설레|두근|심장|귀여워|잘생/,replies:['갑자기 그러면\n나 무슨 표정 지어야 되는데','나 지금 웃는 거 안 보여서 다행이다','이런 말은 왜 꼭 문자로 해\n얼굴 보고도 해줘']},
{id:'food',match:/밥|먹|배고|피자|치킨|떡볶이|라면|메뉴|저녁|간식/,replies:['뭐 먹을 건데?\n나도 아직 못 골랐어','피자 어때\n한 조각은 네 거 남겨줄게','메뉴 고르는 데 벌써 십 분 쓴 듯\n너 먹고 싶은 걸로 하자']},
{id:'drink',match:/커피|카페|음료|아아|라떼|마실/,replies:['너 늘 마시던 거?\n나 이제 외웠는데','카페 가면 또 한참 앉아 있겠다\n난 좋은데']},
{id:'sad',match:/힘들|우울|속상|울었|울고|눈물|외로|불안|짜증|스트레스/,replies:['무슨 일 있었어\n말하기 싫으면 안 해도 돼. 나 듣고 있어','오늘 좀 힘들었구나\n괜찮은 척 안 해도 돼','당장 해결은 못 해도\n옆에서 얘기는 들어줄 수 있어']},
{id:'sick',match:/아파|아프|감기|몸살|두통|열나|병원/,replies:['많이 아파?\n일단 쉬어. 답장은 천천히 해','혼자 참지 말고 주변에 얘기해\n상태 안 좋으면 진료 받고']},
{id:'sleep',match:/졸려|졸리|잘\s*자|자러|잠|피곤|누웠/,replies:['벌써 졸려?\n잡아두고 싶긴 한데 자야지','나랑 얘기하다 잠들어도 돼\n읽씹했다고 뭐라 안 함','오늘 고생했네\n이불 잘 덮고']},
{id:'doing',match:/뭐\s*해|뭐\s*하|머해|머하|모해|바빠/,replies:['나 잠깐 나왔어\n근데 네 연락 와서 멈춰 섰지','너 답장 기다리는 중이라고 하면\n좀 티 나나','별거 안 해\n너랑 얘기하는 거 말고']},
{id:'where',match:/어디|집이야|밖이야|위치/,replies:['집 근처\n조금 걷고 있었어','아직 멀리는 안 갔어\n너는 집이야?']},
{id:'meet',match:/만나|나올|나갈|보자|산책|데리러|와줘|올래/,replies:['나갈 준비는 할 수 있지\n너 진짜 나올 거야?','너도 슬슬 준비해\n급하게 나오진 말고','그럼 잠깐만 보자\n얘기는 만나서 해도 되니까']},
{id:'music',match:/노래|taste|테이스트|음악|플리|애플\s*뮤직|목소리/,replies:['지금 무슨 노래 듣는데\n나도 같이 들을래','같은 노래 틀고 얘기하자\n좀 같이 있는 것 같잖아','그 노래 들을 때 나 생각났어?\n그럼 성공인데']},
{id:'photo',match:/사진|인스타|fullsun|프사|셀카|카메라|잘\s*나왔/,replies:['그 사진 아직 갖고 있어?\n지운 줄 알았는데','네가 찍어준 거라 올렸지\n좀 괜찮게 나왔더라','프사 바뀐 거 바로 봤네\n은근 관심 많다']},
{id:'call',match:/전화|통화|전화해|목소리\s*듣/,replies:['응. 조금 있다 전화할게\n지금은 문자로 얘기하자','전화로 들으면 또 놀릴 거잖아\n일단 조금만 기다려']},
{id:'jealous',match:/질투|다른\s*여자|여친|여자\s*친구|누구랑|누구야/,replies:['왜\n좀 신경 쓰여?','궁금하면 그냥 물어봐\n혼자 결론 내리지 말고','지금 연락하는 건 너잖아']},
{id:'bored',match:/심심|할\s*거\s*없|놀아|재밌/,replies:['그래서 나 찾은 거야?\n그건 좀 좋은데','내가 연락 안 했으면 뭐 하려고 했는데','그럼 나랑 얘기해\n지금 시간 있어']},
{id:'work',match:/학교|수업|과제|시험|공부|출근|퇴근|회사|알바|일하/,replies:['오늘도 고생했네\n이제 좀 쉬어?','그거 끝나면 연락해\n나 기다리는 건 잘해','너무 무리하지 말고\n중간에 물도 좀 마셔']},
{id:'weather',match:/추워|춥|더워|덥|날씨|비\s*와|비\s*오|우산/,replies:['밖에 좀 쌀쌀하더라\n나오면 겉옷 챙겨','창밖 봤어?\n나도 방금 보고 있었는데']},
{id:'thanks',match:/고마|감사/,replies:['뭘 이런 걸로\n다음엔 네가 해줘','알면 됐어\n나 좀 잘 챙기지']},
{id:'sorry',match:/미안|잘못/,replies:['괜찮아\n그렇게까지 미안해할 일 아니야','응. 말해줘서 고마워\n이제 신경 쓰지 마']},
{id:'laugh',match:/ㅋㅋ|ㅎㅎ|하하|웃겨|웃기/,replies:['웃었네\n그럼 됐어','왜 웃어 ㅋㅋ\n나 꽤 진지했는데','그 표정 지금 보고 싶은데']},
{id:'greeting',match:/안녕|하이|왔어|동혁아|해찬아/,replies:['왔네\n뭐 하고 있었어','응 여기 있어\n왜 이렇게 늦게 왔어']},
{id:'bye',match:/잘\s*가|바이|이따\s*봐|갈게|가야/,replies:['응. 조심히 가\n폰 보면서 걷지는 말고','알겠어\n조금 있다 연락할게']},
{id:'question',match:/왜|뭔데|무슨\s*말|진짜|정말|뭐가/,replies:['너랑 얘기하고 싶어서\n그거 말고 이유가 더 필요해?','그냥 하는 말은 아닌데\n나 은근 티 내고 있잖아']},
];
const followups:Record<string,string[]>={
food:['그럼 그걸로 하자\n나중에 메뉴 바꾸기 없기','알겠어. 네 취향 접수'],
'not-eaten':['일단 뭐라도 먹자\n빈속으로 있지 말고'],
meet:['그럼 급하게 나오지 말고\n준비되면 얘기해','응. 겉옷 챙기고'],
'not-meet':['응. 오늘은 편하게 쉬어\n나중에 봐도 되지'],
miss:['나도\n이 정도면 서로 말한 걸로 하자'],
love:['너 지금 표정 궁금하다\n나만 이러고 있나'],
sad:['응 듣고 있어\n천천히 얘기해'],
sleep:['그럼 푹 쉬어\n답장하려고 버티지 말고'],
rumor:['나한테 직접 물어봐 줘서 고마워\n혼자 걱정하는 것보단 낫잖아'],
};
const fallbacks=['응 듣고 있어\n조금만 더 얘기해줘','너 지금 무슨 표정으로 보내고 있어?\n혼자 상상하니까 좀 웃기다','그 얘기는 만나서도 해줘\n네가 직접 하는 거 듣고 싶어','나 지금 걷다가 멈췄어\n답장하는 데 은근 집중하게 되네','잠깐만. 그거 좀 더 설명해줘\n대충 듣고 넘기긴 싫어서'];
export function replyTo(message:string,state:DialogueState):{reply:string;state:DialogueState;topic:string}{
 const text=message.normalize('NFKC').toLowerCase().trim();
 const topic=topics.find(t=>t.match.test(text));
 const short=/^(응+|웅+|엉+|네+|그래|맞아|좋지|오케이|ㅇ+|알겠어|당연하지|아니|ㄴ+)[.!?~\s]*$/.test(text);
 let id=topic?.id||'fallback',pool=topic?.replies||fallbacks;
 if(!topic&&short&&state.lastTopic){id='follow:'+state.lastTopic;pool=/^(아니|ㄴ)/.test(text)?['아 내가 잘못 알아들었네\n어떤 뜻이었어?']:(followups[state.lastTopic]||['응. 조금 더 얘기하자\n나 아직 시간 있어','알겠어\n너 답장 오는 거 자꾸 보게 되네']);}
 const used=state.uses[id]||0;
 return {reply:pool[used%pool.length],topic:id,state:{turn:state.turn+1,lastTopic:topic?.id||(short?state.lastTopic:''),uses:{...state.uses,[id]:used+1}}};
}

export interface Review {
  id: string;
  name: string;
  role?: string | null;
  rating: number;
  text: string;
  created_at?: string;
}

// Client reviews from Google (transcribed from screenshots). Reviews submitted
// through the "Write a review" form are stored in Supabase and shown before these.
const G = "Google review";

export const featuredReviews: Review[] = [
  {
    id: "g-karthik",
    name: "S Karthik",
    role: `${G} · Apr 2024`,
    rating: 5,
    text: "In the past, I purchased online policies / through advisors without a specific goal in mind, which led me to choose the wrong ones.\n\nHowever last week, a friend referred me to Mr Jaisimha from InsureLeague who provided precise guidance on goal oriented solutions.\n\nI highly recommend seeking professional advice for a diversified retirement plan",
  },
  {
    id: "g-balakrishna",
    name: "R Balakrishna",
    role: `${G} · Apr 2024`,
    rating: 5,
    text: "I communicated with the Insureleague team and outlined my retirement plan objectives.\n\nAfter a few days, they presented me with five customized solutions from three top insurance companies. The team thoroughly explained each option, allowing me to confidently select the most suitable plan.\n\nI wholeheartedly endorse Insureleague for retirement solutions to my family and friends.",
  },
  {
    id: "g-sanjay",
    name: "Sanjay Madyalkar",
    role: G,
    rating: 5,
    text: "Ms Indu R helped me in getting my term insurance for decent amount which i earlier thought is a herculean task and i almost lost the hope because of so much documentation, health test etc etc. But her guidance and swift actions made this possible like a cakewalk. Most important because of meticulous check on health terms she saved overloaded extra premium levied by insurance company . This is a really big relief for me . I wholeheartedly thank Mrs Indu for guidance and selfless support.\n\nI would refer her services without second thought.",
  },
  {
    id: "g-lakshminarayanan",
    name: "Lakshminarayanan R",
    role: G,
    rating: 5,
    text: "InsureLeague is a very professional team. I have personally availed both Life and Health insurance from them and they have been excellent in servicing the requests. The most important aspect of insurance is the claim and I have received timely support during claim settlements. Highly recommend InsureLeague for all insurance requirements.",
  },
  {
    id: "g-iqis",
    name: "International Quality Information Systems",
    role: `${G} · Jun 2023`,
    rating: 5,
    text: "Both Mr. Jaisimha and Mrs..Indu are knowledgeable in the subject to ensure the customer gets the right policy for his needs. They are among the best, trustworthy, reliable people in the field of Insurance I have come across. I have no hesitation in recommending them to others. All the best Mr. Jaismha and Mrs. Indu Ramanujam.",
  },
  {
    id: "g-harshitha",
    name: "Harshitha Muralikrishnan",
    role: `${G} · Jan 2023`,
    rating: 5,
    text: "I have approached Insure League for my insurance requirements. Both Indu madam and Jaisimha sir have explained the products and benefits in detail. It was pleasant to interact with them. They explained each and every aspect in such a way that I understand fully.\n\nI strongly recommend to approach them for financial planning, in particular, any kind of insurance requirements",
  },
  {
    id: "g-madhu",
    name: "Madhu",
    role: G,
    rating: 5,
    text: "Indu is truly an advisor who recommends the best plan for her client, keeping their best interests in consideration. She doesn’t try to sell the product but allows the client to take their time to decide. I recommend InsureLeague to everyone who is looking for insurance solutions.",
  },
  {
    id: "g-sowmya",
    name: "Sowmya S",
    role: G,
    rating: 5,
    text: "I recently reached out to Indu for a term insurance policy. She took time to understand what my needs were and gave suggestions as per. She was patient through my various set of questions and explained me the nuances. Best part, she didn't rush me through , I took my time to decide and proceed with things. It was a very nice experience working with Insure league. Thank you!",
  },
  {
    id: "g-sharath",
    name: "Sharath Kashyap",
    role: `${G} · Dec 2022`,
    rating: 5,
    text: "Excellent service! I am impressed, their process of explaining and the time they take to make sure you understand the details is commendable. Thank you Indu for all the time and help!",
  },
  {
    id: "g-garuda",
    name: "Garuda Prakash",
    role: `${G} · Sep 2022`,
    rating: 5,
    text: "Once you invest through InsureLeague you’d feel like coming back again and again due to their professional service.\n\nThanks once again and keep it up.",
  },
  {
    id: "g-rathnam",
    name: "Rathnam Subramanyam",
    role: `${G} · Oct 2021`,
    rating: 5,
    text: "They understood the need and provided appropriate solutions giving a few options to pick from. They also clarified the doubts without rushing through the suggestions",
  },
  {
    id: "g-shaila",
    name: "Shaila Vivek",
    role: `${G} · Oct 2021`,
    rating: 5,
    text: "At the outset, detailed information of different products were provided, enabling us to pick a product meeting our requirements. InsureLeague definitely addressed all our queries untill the final policy was issued and have ensured to continue their support in the future too. Definitely would recommend their services for customer's looking out for retirement plans.",
  },
  {
    id: "g-srihari",
    name: "Sri Hari",
    role: `${G} · Jun 2021`,
    rating: 5,
    text: "I had a counselling by Mr. Jayasimha and Indu. What they bring to the table is professionalism, indepth knowledge of the industry and ability to understand your needs and suggest options to cater your needs.\n\nI personally like them because they are relentless in trying to understand your needs but not sales driven.\nThey take immense care not to suggest a wrong product.\n\nHad a great experience with them and definitely suggest my friends to them.",
  },
  {
    id: "g-vijay",
    name: "Vijay Kumar",
    role: `${G} · Jun 2021`,
    rating: 5,
    text: "InsureLeague team understands the customers needs.They support with good quality and service. Thanks team and keep continue with same deliverables.",
  },
];

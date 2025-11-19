--
-- PostgreSQL database dump
--

\restrict TmzDjgDcXs0fMAyTRe6yFzH6V9t0qicY1aV7k21urDtKPBMFCJIuJs7PTias4TU

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attraction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attraction (
    id integer NOT NULL,
    "attractionName" character varying NOT NULL,
    "shortDescription" character varying,
    "longDescription" character varying,
    category character varying NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "workingHours" character varying,
    "websiteLink" character varying,
    "phoneNumber" character varying,
    address character varying,
    "placeId" integer
);


ALTER TABLE public.attraction OWNER TO postgres;

--
-- Name: attraction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attraction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attraction_id_seq OWNER TO postgres;

--
-- Name: attraction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attraction_id_seq OWNED BY public.attraction.id;


--
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    id integer NOT NULL,
    "placeName" character varying NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);


ALTER TABLE public.place OWNER TO postgres;

--
-- Name: place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.place_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.place_id_seq OWNER TO postgres;

--
-- Name: place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.place_id_seq OWNED BY public.place.id;


--
-- Name: saved_attraction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_attraction (
    id integer NOT NULL,
    "userId" integer,
    "attractionId" integer
);


ALTER TABLE public.saved_attraction OWNER TO postgres;

--
-- Name: saved_attraction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_attraction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_attraction_id_seq OWNER TO postgres;

--
-- Name: saved_attraction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_attraction_id_seq OWNED BY public.saved_attraction.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "fullName" character varying NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: visited_attraction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visited_attraction (
    id integer NOT NULL,
    rating integer NOT NULL,
    "userId" integer,
    "attractionId" integer
);


ALTER TABLE public.visited_attraction OWNER TO postgres;

--
-- Name: visited_attraction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visited_attraction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.visited_attraction_id_seq OWNER TO postgres;

--
-- Name: visited_attraction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visited_attraction_id_seq OWNED BY public.visited_attraction.id;


--
-- Name: attraction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attraction ALTER COLUMN id SET DEFAULT nextval('public.attraction_id_seq'::regclass);


--
-- Name: place id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place ALTER COLUMN id SET DEFAULT nextval('public.place_id_seq'::regclass);


--
-- Name: saved_attraction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_attraction ALTER COLUMN id SET DEFAULT nextval('public.saved_attraction_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: visited_attraction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visited_attraction ALTER COLUMN id SET DEFAULT nextval('public.visited_attraction_id_seq'::regclass);


--
-- Data for Name: attraction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attraction (id, "attractionName", "shortDescription", "longDescription", category, latitude, longitude, "workingHours", "websiteLink", "phoneNumber", address, "placeId") FROM stdin;
4	Exchange Office Trgovina Center	The exchange office offers currency exchange services with competitive rates in a convenient central location.	The exchange office provides reliable and efficient currency exchange services for both residents and visitors. Located in the town center, it offers a convenient place to exchange foreign currencies at competitive rates. The staff ensures quick service, secure transactions, and up-to-date exchange information, making it a useful stop for travelers, shoppers, and anyone needing financial services.	Exchange Office	42.91839456424301	21.738074055283157	08-20	\N	0113334999	Cara Dušana 	1
5	Serbian Orthodox Church of the Beheading of St. John the Baptist	A Serbian Orthodox church dedicated to the Beheading of St. John the Baptist, serving as a local place of worship and a site of cultural and spiritual significance.	This Serbian Orthodox church is dedicated to the Beheading of St. John the Baptist, one of the most important feast days in the Orthodox tradition. The church serves as a spiritual center for the local community, hosting regular liturgical services, religious celebrations, and important cultural events. Known for its peaceful surroundings and traditional architecture, the church represents an important part of the region’s religious heritage and offers visitors a place for prayer, reflection, and connection to local traditions.	Religion	42.91772097799862	21.736433449495244	06:30-18:30	\N	016844059	Cara Dušana 	1
6	Nišava River	The Nišava River flows through the city of Niš, offering scenic views, pleasant riverbanks, and an important natural landmark that shapes the city’s landscape.	The Nišava River is one of the defining natural features of the city of Niš. Flowing through the urban center, it provides picturesque riverbanks, walking paths, and relaxing viewpoints enjoyed by both residents and visitors. The river has played an important role in the region’s history, settlement, and development, serving as a natural corridor connecting eastern and central Serbia. Today, the Nišava adds charm to the city’s atmosphere and offers an inviting setting for leisure, recreation, and outdoor activities.	Nature	43.322923919291476	21.884824920491866	\N	\N	\N	\N	2
7	The City Bridge over the Nišava River	A central bridge spanning the Nišava River, connecting key parts of the city and offering pleasant views of the river and surrounding landmarks.	The bridge over the Nišava River is one of the city’s main crossings, linking important urban areas and providing easy access to Niš’s central attractions. It offers scenic views of the riverbanks, walking paths, and the city skyline. Frequently used by both residents and visitors, the bridge serves not only as a practical transportation route but also as a recognizable urban spot for enjoying the river and the atmosphere of Niš.	Architecture	43.32284737872542	21.895292109703018	00-24	\N	\N	Trg kralja Milana	2
8	Niš Fortress	Niš Fortress is a well-preserved Ottoman fortification located in the heart of Niš, offering historic architecture, scenic walkways, and cultural events throughout the year.	Niš Fortress is one of the most significant historical and architectural landmarks in the city. Built in the early 18th century on the foundations of earlier Roman, Byzantine, and medieval structures, the fortress represents a blend of cultural influences shaped over centuries. Located along the Nišava River, it features preserved stone walls, gates, and towers, as well as spacious park areas popular for walking and recreation. Today, Niš Fortress serves not only as a historical site but also as a vibrant cultural venue hosting festivals, concerts, exhibitions, and public events, making it a central gathering point for both residents and visitors	Architecture	43.32605536766566	21.89565094978564	00-24	https://niskatvrdjava.rs/	0631735871	Djuke Dinic	2
9	Bali Bey Mosque	The Bali Bey Mosque is a historic Ottoman mosque located near Niš Fortress, known for its distinctive architecture and cultural significance.	The Bali Bey Mosque is one of the most important Ottoman architectural monuments in Niš. Built in the 16th century, it stands near the western entrance of Niš Fortress and represents a key landmark of the city’s Ottoman heritage. The mosque features traditional stone construction, a spacious interior, and characteristic decorative elements of the period. Although it no longer functions as a place of worship, the building is preserved as a cultural monument and is occasionally used for exhibitions and cultural events. The Bali Bey Mosque offers visitors a glimpse into the historical layers that shaped Niš over the centuries.	Art	43.32544167394362	21.894520675295556	12-18	https://gslunis.rs/	\N	Niska Tvrdjava	2
10	City Garden at the Fortress	A peaceful green area within Niš Fortress, offering walking paths, benches, and scenic views of the historic walls and surrounding city.	The City Garden at Niš Fortress is a serene and well-maintained park located within the historic fortress walls. It provides walking paths, shaded benches, and beautifully landscaped areas, making it a favorite spot for relaxation and leisurely strolls. Surrounded by centuries-old stone walls and towers, the garden combines natural beauty with historical ambiance, offering visitors a unique place to enjoy the outdoors while exploring the fortress. The City Garden also hosts occasional cultural and community events, enhancing its role as a central recreational area in Niš.	Nature	43.327370346464605	21.896062330608054	08-20	\N	\N	Niska Tvrdjava	2
11	King Milan Square	A central city square in Niš, surrounded by important buildings, shops, and cafés, serving as a hub for social and cultural life.	King Milan Square is one of the main urban squares in Niš, named after King Milan Obrenović. The square is surrounded by historical and administrative buildings, cafés, shops, and public spaces, making it a lively gathering point for residents and visitors alike. It hosts cultural events, public celebrations, and social gatherings throughout the year, reflecting the city’s vibrant community life. With its central location, King Milan Square serves as an important landmark and starting point for exploring Niš’s streets, attractions, and local culture.	Square	43.32149798990336	21.895768171299235	00-24	https://www.ni.rs/	\N	Generala Milojka Lešjanina 8	2
14	Police Station 'Palilula	A local police station serving the surrounding area of Niš.	The Police Station 'Palilula' is a local law enforcement office in Niš. It is responsible for maintaining public safety, preventing crime, and assisting citizens with administrative police matters. Residents and visitors can turn to this station for reporting incidents or seeking support in legal and civil safety issues.	Important	43.319699561926186	21.881217071088997	00-24	https://www.mup.gov.rs/wps/portal/sr/	018503484	Koste Abraševića 1	2
1	Police Station Lebaen	The Police Station in Lebane provides safety and security services for residents and visitors, serving as the main local law enforcement office.	The Police Station in Lebane serves as the central law enforcement institution in the municipality, responsible for maintaining public safety, assisting citizens, and supporting community well-being. Visitors may contact the station for assistance, reporting incidents, or obtaining necessary documentation. The facility operates within the national police framework and contributes to ensuring a safe and orderly environment for both locals and travelers.	Important	42.92250773806435	21.74003282258853	00-24	https://www.mup.gov.rs/wps/portal/sr/	016 200238	Cara Dušana 68	1
2	The Health Center	The Health Center in Lebane provides primary medical care and essential health services for residents and visitors.	The Health Center in Lebane is the main provider of primary healthcare in the municipality, offering medical examinations, emergency assistance, preventive services, and patient support. The facility includes general practice, pediatric care, laboratory services, and other essential departments. It plays a key role in safeguarding the well-being of the local community and is available to both residents and travelers who may need medical assistance.	Important	42.92246781506804	21.740489709043114	00-24	https://www.dzlebane.co.rs/	016 843030	Cara Dušana 70	1
3	Fire Station Lebane	The Fire Station in Lebane provides fire protection, rescue services, and emergency response for the local community.	The Fire Station in Lebane is responsible for fire protection, emergency response, and rescue operations throughout the municipality. The station’s professional firefighting team is trained to handle fires, traffic accidents, natural disasters, and other emergency situations. Their work ensures the safety of residents, properties, and public spaces, making the station an essential part of the community’s protection and preparedness system.	Important	42.922397652174126	21.739781947696063	00-24	\N	016 843 123	Cara Dušana bb	1
12	Police Administration Niš	A central police administration office in Niš responsible for law enforcement, public order, and administrative police matters.	The Police Administration in Niš is the main law enforcement authority in the city, located at Nade Tomić 14 in the Medijana municipality. It oversees public safety, crime prevention, and policing operations in Niš. The office provides services such as crime reporting, administrative documentation, and community assistance. As a key institution in the city, it plays a critical role in ensuring safety and order for both residents and visitors.	Important	43.31935102744117	21.896531896483534	07:30-20	https://www.mup.gov.rs/wps/portal/sr/	018511222	Nade Tomić 14	2
13	Police Station Crveni Krst	The Crveni Krst Police Station is a local law enforcement office serving the Crveni Krst area of Niš.	The Crveni Krst Police Station (MUP – Policijska ispostava Crveni Krst) is located at Bulevar 12. februar 89 in the Crveni Krst neighborhood of Niš. It is responsible for maintaining public safety, preventing crime, and handling administrative police matters in the local community. Residents and visitors can turn to this station for reporting incidents, seeking assistance, or dealing with legal and civil safety issues.	Important	43.333709807650074	21.880934395028337	00-24	https://www.mup.gov.rs/wps/portal/sr/	018581689	Bulevar 12. februar  89	2
15	Traffic Police Department Niš	The Traffic Police Department in Niš enforces road safety, handles traffic incidents, and supervises driving regulations.	The Traffic Police Department of Niš is located at Vojvode Mišića 56 in the Medijana municipality. It is responsible for enforcing traffic laws, conducting roadside inspections, investigating traffic accidents, and promoting road safety in the city. The department serves both drivers and pedestrians, providing administrative and legal support related to traffic violations. Its presence contributes to maintaining order on Niš’s streets, reducing road-related risks, and ensuring safe mobility for residents and travelers alike.	Important	43.32222736897677	21.90898859992472	08-20	https://www.mup.gov.rs/wps/portal/sr/	018527767	Vojvode Mišića 56	2
16	Police Substation 'Medijana'	A local police substation serving the Medijana area of Niš.	The Police Substation 'Medijana' is a local law enforcement office in Niš, responsible for maintaining public safety, preventing crime, and assisting citizens with administrative and legal matters. Residents and visitors in the Medijana area can report incidents, seek guidance, or request support related to civil and police services.	Important	43.321978561376845	21.917931157596165	00-24	https://www.mup.gov.rs/wps/portal/sr/	018503242	Pariske Komune	2
17	Health Center Niš	Provides primary healthcare services for residents and visitors.	The Health Center in Niš (Dom zdravlja) offers general medical care, preventive services, and patient support throughout the city. It includes general practice, pediatric care, laboratory services, and other essential medical departments, playing a central role in the health and well-being of the local community.	Important	43.32291416508282	21.907923767578808	07-20	https://www.domzdravljanis.co.rs/	018503666	Vojvode Tankosića 15	2
18	Old Clinical Center	Historic medical center providing healthcare services in Niš.	The Old Clinical Center in Niš is one of the city’s longstanding medical institutions, offering general and specialized healthcare services to the local community. While newer facilities exist, this center continues to provide consultations, diagnostics, and treatment across multiple medical disciplines, serving as an important part of Niš’s healthcare infrastructure.	Important	43.315785423920715	21.912559655953604	00-24	https://www.kcnis.rs/	018506906	Bulevar dr Zorana Đinđića 48	2
19	New Clinical Center	Modern medical center providing specialized and general healthcare services.	The New Clinical Center in Niš is a state-of-the-art hospital offering comprehensive medical care, including specialized treatment, diagnostics, emergency services, and outpatient care. It serves as a central hub for healthcare in the Niš region, equipped with advanced technology and staffed by highly trained medical professionals, ensuring quality treatment for patients from Niš and nearby municipalities.	Important	43.31389497012852	21.91694404225329	00-24	https://www.kcnis.rs/	0184158000	Vojislava Ilića 10	2
20	Fire and Rescue Unit, Niš	Provides fire protection, emergency response, and rescue services for the city of Niš.	The Fire and Rescue Unit in Niš is responsible for responding to fires, traffic accidents, natural disasters, and other emergencies in the city. Equipped with modern firefighting vehicles and trained personnel, the unit ensures the safety of residents, protects property, and supports community preparedness. It is an essential institution for public safety and disaster response in Niš.	Important	43.32256880810218	21.909114752235972	00-24	\N	018527656	Vojvode Mišića 56	2
\.


--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (id, "placeName", latitude, longitude) FROM stdin;
1	Lebane	42.917221	21.736509
2	Niš	43.320904	21.89576
3	Rome	41.902782	12.496365
4	Nafplio	37.56818	22.808661
6	Budapest	47.497913	19.040236
7	Istanbul	41.00824	28.978359
8	Korinth	37.93858	22.93203
9	Barcelona	41.385063	2.173404
10	Nice	43.710175	7.261953
11	Venice	45.440845	12.315515
12	Saint Petesburg	59.93848	30.312481
5	Athens	37.98381	23.727539
\.


--
-- Data for Name: saved_attraction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_attraction (id, "userId", "attractionId") FROM stdin;
4	1	9
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "fullName", email, username, password) FROM stdin;
1	Marija Trajkovic	marijatr@gmail.com	marijica	$2b$11$3gu.Z8/2Yp3XHrvAAearK.AZ2h3ZxAlhCzHzs2zGn/cGEQd0ftZ/W
2	Janko Jovic	jjovic@gmail.com	jjovic76	$2b$11$oHMqMV/0loid4KYHfab0IOCKe2NSLbxvIdLp5EycD3lWWQEanCp9a
\.


--
-- Data for Name: visited_attraction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visited_attraction (id, rating, "userId", "attractionId") FROM stdin;
1	4	1	3
2	4	1	11
3	2	1	10
5	1	1	17
6	1	1	6
7	2	1	8
8	1	2	11
4	1	1	9
9	2	1	7
10	5	1	12
\.


--
-- Name: attraction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attraction_id_seq', 20, true);


--
-- Name: place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_id_seq', 12, true);


--
-- Name: saved_attraction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_attraction_id_seq', 9, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: visited_attraction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visited_attraction_id_seq', 10, true);


--
-- Name: saved_attraction PK_40ad612c9ef9ec2ac4c3605386a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_attraction
    ADD CONSTRAINT "PK_40ad612c9ef9ec2ac4c3605386a" PRIMARY KEY (id);


--
-- Name: visited_attraction PK_6cd102b55d39fb6963f46260283; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visited_attraction
    ADD CONSTRAINT "PK_6cd102b55d39fb6963f46260283" PRIMARY KEY (id);


--
-- Name: attraction PK_77e12d8cacc502d880f3cb46ab0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attraction
    ADD CONSTRAINT "PK_77e12d8cacc502d880f3cb46ab0" PRIMARY KEY (id);


--
-- Name: place PK_96ab91d43aa89c5de1b59ee7cca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: attraction FK_1123fdf2c693ca56dc7cfc55d15; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attraction
    ADD CONSTRAINT "FK_1123fdf2c693ca56dc7cfc55d15" FOREIGN KEY ("placeId") REFERENCES public.place(id) ON DELETE CASCADE;


--
-- Name: saved_attraction FK_17c38a987a385d62a29a8303ea7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_attraction
    ADD CONSTRAINT "FK_17c38a987a385d62a29a8303ea7" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: saved_attraction FK_2159bc2a2d0d740aeea9ba998dd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_attraction
    ADD CONSTRAINT "FK_2159bc2a2d0d740aeea9ba998dd" FOREIGN KEY ("attractionId") REFERENCES public.attraction(id) ON DELETE CASCADE;


--
-- Name: visited_attraction FK_46bddcdc0f09b2c54f3493b2f9d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visited_attraction
    ADD CONSTRAINT "FK_46bddcdc0f09b2c54f3493b2f9d" FOREIGN KEY ("attractionId") REFERENCES public.attraction(id) ON DELETE CASCADE;


--
-- Name: visited_attraction FK_9dd33218ffe0f11fd342fccb3c9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visited_attraction
    ADD CONSTRAINT "FK_9dd33218ffe0f11fd342fccb3c9" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict TmzDjgDcXs0fMAyTRe6yFzH6V9t0qicY1aV7k21urDtKPBMFCJIuJs7PTias4TU


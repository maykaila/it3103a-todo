CREATE DATABASE IF NOT EXISTS chromatica_db;
USE chromatica_db;

-- 1) artists must exist before artworks
CREATE TABLE IF NOT EXISTS artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_name VARCHAR(100) NOT NULL,
    artist_description TEXT,
    profile_picture VARCHAR(255)
);

-- 2) artworks depends on artists
CREATE TABLE IF NOT EXISTS artworks (
    artwork_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    year_created INT,
    subject VARCHAR(100),
    size_dimensions VARCHAR(100),
    medium VARCHAR(100),
    frame VARCHAR(100),
    authenticity VARCHAR(100),
    packaging VARCHAR(100),
    ready_to_hang BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    FOREIGN KEY (artist_id)
      REFERENCES artists(artist_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- 3) users stands alone
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4) orders depends on users + artworks
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    artwork_id INT NOT NULL,
    user_id INT NOT NULL,
    order_status ENUM('pending', 'completed', 'cancelled') NOT NULL,
    date_of_order TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
      REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (artwork_id)
      REFERENCES artworks(artwork_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- 5) payment depends on orders
CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
    date_of_payment TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id)
      REFERENCES orders(order_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- Insert artists
INSERT INTO artists (artist_id, artist_name, artist_description, profile_picture) VALUES
(1,  'Alice Chen',  'Alice Chen is a contemporary landscape painter based in Vancouver. Her work captures the play of light and atmosphere in outdoor settings, often painted en plein air. She holds a BFA from the Emily Carr University of Art + Design and has exhibited across Western Canada.', ''),
(2,  'Marco Silva', 'Marco Silva is a Brazil-born abstract painter whose vibrant color fields explore the rhythms of urban life. His work has been featured in galleries from São Paulo to New York City. He holds an MFA from the Rhode Island School of Design and teaches part-time at a community art center in Rio de Janeiro.', ''),
(3,  'Nora Patel',  'Nora Patel is an Indian-Canadian painter known for her serene forest vistas and attention to natural light. She earned her MFA at the University of British Columbia and has been awarded several plein-air residencies. Her paintings hang in private and corporate collections across North America.', ''),
(4,  'Jaime Ortega','Jaime Ortega is a Spanish painter whose floral works blend realism with impressionistic brushwork. He studied at the Real Academia de Bellas Artes de San Fernando in Madrid. His pieces have been collected by museums and include both large commissions and gallery showings throughout Europe.', ''),
(5,  'Lydia Kim',   'Lydia Kim is a Korean-American artist whose nocturnal cityscapes explore themes of solitude and reflection. She received her BFA from the School of the Art Institute of Chicago and has participated in several international group exhibitions. Her mixed-media approach combines acrylic with oil pastel for textural depth.', ''),
(6,  'Omar El-Masri','Omar El-Masri is an Egyptian painter celebrated for his evocative desert scenes that emphasize light and heat. He studied fine art in Cairo before traveling widely through the Middle East and North Africa on painting expeditions. His works have been featured in cultural festivals and private collections globally.', ''),
(7,  'Elena Grigore','Elena Grigore is a Romanian abstract artist whose layered blues and subtle textures evoke a meditative calm. She holds a degree in Visual Arts from the National University of Arts in Bucharest. Her work has been exhibited in Eastern Europe and she collaborates frequently with interior designers for custom commissions.', ''),
(8,  'Marcus Lee',  'Marcus Lee is an American realist painter focusing on rural life and seasonal agricultural scenes. He grew up on a family farm in Wisconsin and studied at the Milwaukee Institute of Art & Design. His detailed canvases have been published in several art journals and featured in regional art fairs.', ''),
(9,  'Sarita Das',   'Sarita Das is an Indian painter merging botanical illustration with surrealist elements to create dreamlike florals. She received her art education at Kala Bhavana in West Bengal and later completed a residency in Berlin. Her work explores the intersection of memory and nature.', ''),
(10, 'Tobias Schmidt','Tobias Schmidt is a German landscape painter known for his dramatic coastal and cliffside scenes. He graduated from the Academy of Fine Arts in Munich and spent several years traveling Europe’s northern shores for inspiration. His paintings are held in private collections across Germany and Scandinavia.', ''),
(11, 'Diana Rivera','Diana Rivera is a Mexican-American charcoal specialist whose portraiture emphasizes emotional depth and texture. She studied at the Instituto Allende in San Miguel de Allende and later at the School of Visual Arts in New York. Rivera’s drawings have been exhibited in both solo and group shows throughout the U.S.', ''),
(12, 'Leo Matsumoto','Leo Matsumoto is a Japanese urban sketcher capturing candid street scenes with lively, expressive lines. He studied illustration at Tama Art University in Tokyo and travels extensively to sketch in cities around the world. His sketchbooks have been published and translated into multiple languages.', ''),
(13, 'Ingrid Olsson','Ingrid Olsson is a Swedish illustrator whose work blends folklore motifs with natural settings. She trained at Konstfack University College of Arts, Crafts and Design in Stockholm. Her pen & ink illustrations have appeared in children’s books and gallery exhibitions in Scandinavia.', ''),
(14, 'Marco Costa', 'Marco Costa is an Italian artist celebrated for his dynamic gesture drawings of dancers and performers. He received his classical training at Accademia di Belle Arti di Firenze and later studied movement and choreography. Costa’s work has been featured in performing arts publications across Europe.', ''),
(15, 'Priya Singh','Priya Singh is an Indian-British artist whose drawings fuse precise architectural drafting with freehand techniques. She studied architecture at the Bartlett School of Architecture in London and fine art at the Royal College of Art. Her hybrid works have been exhibited in architectural conferences and art galleries.', ''),
(16, 'Elena Moreno','Elena Moreno is a Spanish draftsman specializing in realistic still lifes that showcase subtle tonal contrasts. She trained at the Universidad de Salamanca and apprenticed under a master botanical illustrator. Moreno’s graphite and charcoal pieces have been featured in art magazines and botanical journals.', ''),
(17, 'Omar Al-Faiz','Omar Al-Faiz is an Iraqi-born artist whose minimalist charcoal drawings explore the interplay between light and shadow. He studied fine art at Baghdad’s Academy of Fine Arts before relocating to London for postgraduate work. His stark, evocative works have been acquired by private collectors in Europe and the Middle East.', ''),
(18, 'Valeria Rossi','Valeria Rossi is an Italian urban sketcher famous for her watercolor and pencil depictions of Venice. She studied at the Accademia di Belle Arti di Venezia and leads sketching workshops across Italy. Rossi’s work captures the city’s architecture and light with delicate, fluid strokes.', ''),
(19, 'Jayden Brooks','Jayden Brooks is an American illustrator whose steampunk-inspired drawings blend anatomical accuracy with fantastical machinery. He earned his BFA from the Savannah College of Art and Design and has published graphic novels featuring his artwork. Brooks teaches illustration masterclasses online and at conventions.', ''),
(20, 'Mei Lin',     'Mei Lin is a Taiwanese artist who combines watercolor washes with graphite detail to evoke misty landscapes and atmospheric scenes. She studied at Taipei National University of the Arts and later completed a residency in Kyoto. Her layered technique and delicate lines have been featured in Asian art biennales.', ''),
(21, 'Hannah Thompson','Hannah Thompson is an American digital artist creating ethereal seascapes and dreamlike marine compositions. She studied digital illustration at the Rhode Island School of Design and works primarily with high-resolution painting software. Her giclée prints have been showcased in online galleries and coastal-themed exhibitions.', ''),
(22, 'Carlos Vega', 'Carlos Vega is a Mexican printmaker specializing in detailed botanical lithographs. He trained at the Taller de Gráfica Popular in Mexico City and has exhibited his lithographs internationally. Vega’s work is held in museum collections and has been featured in botanical illustration publications.', ''),
(23, 'Naomi Jackson','Naomi Jackson is a British serigrapher known for her pop-art cityscapes and bold use of color. She studied printmaking at the Royal College of Art in London and collaborates frequently with street art festivals. Jackson’s limited-edition screen prints sell out quickly at art fairs across Europe.', ''),
(24, 'Elena Popov','Elena Popov is a Russian printmaker whose drypoint etchings explore urban decay and textural surfaces. She graduated from the Stroganov Moscow State Academy of Arts and Industry and has held residencies in Berlin and Prague. Her prints are prized for their rich tonal range and intricate line work.', ''),
(25, 'Aisha Bello','Aisha Bello is a Nigerian printmaker focusing on avian themes and dynamic wildlife compositions. She studied fine art at Ahmadu Bello University and later trained in color lithography in London. Bello’s vibrant bird prints have been exhibited at environmental art festivals around the world.', ''),
(26, 'Viktor Novak','Viktor Novak is a Croatian digital collage artist whose work combines photography and abstract layering. He studied multimedia art at the Academy of Fine Arts in Zagreb and later took a specialized course in digital print techniques in Berlin. Novak’s giclée prints explore memory, identity, and urban fragmentations.', ''),
(27, 'Sara Lindgren','Sara Lindgren is a Swedish printmaker celebrated for her delicate etchings of botanical subjects. She trained at the Valand Academy Gothenburg and has been artist-in-residence at several Nordic print studios. Lindgren’s work has been featured in major print exhibitions across Scandinavia and the UK.', ''),
(28, 'Diego Ramirez','Diego Ramirez is a Peruvian pop-culture printmaker known for his vibrant serigraphs of retro iconography. He studied graphic design at Pontifical Catholic University of Peru and later apprenticed with a silk-screen master in Lima. Ramirez’s work bridges popular culture and fine art, and he teaches workshops in South America.', ''),
(29, 'Hiro Tanaka', 'Hiro Tanaka is a Japanese woodblock artist reviving traditional multi-block print methods for contemporary subjects. He apprenticed under a master carver in Kyoto and studied printmaking at Tokyo University of the Arts. Tanaka’s woodcuts are collected globally for their craftsmanship and atmospheric depth.', ''),
(30, 'Fatima Khan','Fatima Khan is a Pakistani-Canadian printmaker focusing on geometric landscapes in linocut form. She studied fine art at the National College of Arts in Lahore and completed a residency in Vancouver’s print studio. Her linocuts explore the interplay of form, color, and cultural identity.', '');

-- Insert artworks
INSERT INTO artworks (
  artist_id, title, artist, description, price, year_created,
  subject, size_dimensions, medium, frame, authenticity,
  packaging, ready_to_hang, category
) VALUES
-- Paintings
(1, 'Sunlit Meadow',       'Alice Chen',  'Pastoral landscape at golden hour, oil on canvas.',                              1200.00, 2021, 'Pastoral landscape',             '24″×36″', 'Oil on canvas', 'Yes (floating white frame)', 'Certificate of Authenticity signed by artist', 'Foam-lined crate with weatherproof wrapping', TRUE,  'Painting'),
(2, 'Urban Rhythm',        'Marco Silva', 'Abstract cityscape in bold acrylic color fields.',                              1800.00, 2022, 'Abstract cityscape',            '30″×30″', 'Acrylic on canvas', 'No',                           'Holographic sticker on back',              'Rolled in acid-free paper tube',           FALSE, 'Painting'),
(3, 'Whispering Pines',    'Nora Patel',  'Serene pine forest vista at dawn, oil on panel.',                                950.00,  2020, 'Pine forest',                   '18″×24″', 'Oil on panel',     'Yes (antique gold frame)',    'Signed on front',                          'Double-boxed with corner protectors',     TRUE,  'Painting'),
(4, 'Crimson Bloom',       'Jaime Ortega','Close-up red peony still life, oil on canvas.',                                  1100.00, 2023, 'Floral peony',                  '20″×20″', 'Oil on canvas',    'No',                           'Artist’s embossed seal on back',           'Bubble-wrapped and boxed',                FALSE, 'Painting'),
(5, 'Night Whispers',      'Lydia Kim',   'Rainy city street at night, mixed acrylic and oil pastel on canvas.',            2200.00, 2024, 'Urban nocturne',                '36″×24″', 'Acrylic & oil pastel', 'Yes (sleek black frame)',     'COA and digital certificate',             'Wood crate with desiccant packs',          TRUE,  'Painting'),
(6, 'Desert Mirage',       'Omar El-Masri','Sand dunes at sunset, oil on linen.',                                            1350.00, 2019, 'Desert landscape',              '30″×20″', 'Oil on linen',     'No',                           'Hand-signed on stretcher bar',             'Rolled and shipped in reinforced tube',    FALSE, 'Painting'),
(7, 'Harmony in Blue',     'Elena Grigore','Abstract color field in layered blues, acrylic on canvas.',                      1600.00, 2022, 'Abstract color field',          '24″×24″', 'Acrylic on canvas', 'Yes (white floater)',          'Certificate signed by artist',             'Protective foam wrap and box',             TRUE,  'Painting'),
(8, 'Harvest Glow',        'Marcus Lee',  'Farm field at harvest, oil on canvas.',                                          1500.00, 2021, 'Rural landscape',               '28″×36″', 'Oil on canvas',    'Yes (distressed wood)',       'Detailed provenance included',              'Wooden crate',                            TRUE,  'Painting'),
(9, 'Midnight Garden',     'Sarita Das',  'Dreamlike florals under moonlight, oil on canvas.',                              1300.00, 2023, 'Surreal botanical',             '22″×30″', 'Oil on canvas',    'No',                           'Artist’s stamp on verso',                  'Bubble-wrap + sturdy carton',             FALSE, 'Painting'),
(10,'Windswept Cliffs',    'Tobias Schmidt','Rocky seaside cliffs in wind, oil on canvas.',                                   1750.00, 2020, 'Coastal landscape',             '32″×24″', 'Oil on canvas',    'Yes (dark wood frame)',      'COA with artist signature',               'Crated with foam inserts',                TRUE,  'Painting'),

-- Drawings
(11,'Quiet Reflection',    'Diana Rivera','Thoughtful female charcoal portrait, charcoal on paper.',                       450.00,  2022, 'Female portrait',               '11″×14″', 'Charcoal on paper','Yes (simple black)',        'Signed lower right',                       'Acid-free backing board + plastic sleeve',TRUE,  'Drawing'),
(12,'City Sketch #5',      'Leo Matsumoto','Morning café street scene, graphite on sketchbook paper.',                      300.00,  2021, 'Urban café scene',              '9″×12″',   'Graphite on paper', 'No',                           'Certificate of Drawing Ownership',        'Rolled tube',                              FALSE, 'Drawing'),
(13,'Forest Nymph',        'Ingrid Olsson','Mythical forest figure, pen & ink on bristol.',                                 550.00,  2023, 'Mythical figure in forest',    '12″×16″', 'Pen & ink on bristol','Yes (white mat)',           'Artist’s embossed seal',                   'Rigid mailer',                             TRUE,  'Drawing'),
(14,'Rhythm in Gesture',   'Marco Costa', 'Ballet dancer mid-leap, conte crayon on toned paper.',                          600.00,  2020, 'Dancer in motion',              '18″×24″', 'Conte crayon on paper','No',                         'Signed verso',                             'Wrapped in kraft paper + tube',           FALSE, 'Drawing'),
(15,'Architect’s Eye',     'Priya Singh', 'Gothic cathedral façade, technical pen on vellum.',                             400.00,  2022, 'Gothic architecture',           '14″×11″', 'Technical pen on vellum','Yes (metal frame)',        'COA with ink stamp',                       'Flat-pack in rigid tube',                 TRUE,  'Drawing'),
(16,'Still Life with Pears','Elena Moreno','Fruit on tablecloth, graphite & white charcoal on paper.',                    500.00,  2021, 'Still life of pears',           '16″×20″', 'Graphite & white charcoal','Yes (gold leaf frame)',  'Signature and date on verso',             'Board + protective sleeve',               TRUE,  'Drawing'),
(17,'Eclipse',             'Omar Al-Faiz','Abstract circular form, charcoal on black paper.',                              350.00,  2023, 'Abstract form',                 '12″×12″', 'Charcoal on paper', 'No',                           'Signed lower edge',                        'Rolled in tube',                           FALSE, 'Drawing'),
(18,'Gondola at Dawn',     'Valeria Rossi','Venetian canal at sunrise, water-soluble pencil on paper.',                     420.00,  2020, 'Venetian canal',                '10″×15″', 'Water-soluble pencil', 'Yes (white wood frame)',    'COA included',                             'Flat mailer',                              TRUE,  'Drawing'),
(19,'Mechanical Heart',    'Jayden Brooks','Gear-filled anatomical heart, ink & watercolor on paper.',                      550.00,  2022, 'Steampunk anatomical heart',    '18″×18″', 'Ink & watercolor',  'No',                           'Artist’s wax seal',                       'Rolled + waterproof tube',                FALSE, 'Drawing'),
(20,'Veil of Mist',        'Mei Lin',     'Mountain peaks shrouded in mist, watercolor & graphite on paper.',             480.00,  2023, 'Misty mountain landscape',      '14″×18″', 'Watercolor & graphite','Yes (dark wood frame)',      'Signed & numbered',                       'Mounted on board + sleeve',               TRUE,  'Drawing'),

-- Prints
(21,'Ocean’s Embrace',     'Hannah Thompson','Waves crashing at sunset, archival giclée on fine art paper.',                  120.00, 2021, 'Seascape at sunset',            '16″×20″', 'Giclée on paper',   'No',                           'Numbered edition 12/50, signed',          'Tube + protective sleeve',                FALSE, 'Print'),
(22,'Botanical Study #7',  'Carlos Vega',  'Detailed fern fronds lithograph on cream paper.',                              200.00, 2019, 'Fern botanical study',          '12″×18″', 'Stone lithograph', 'Yes (black frame)',          'Press seal + signature',                  'Flat-packed board',                       TRUE,  'Print'),
(23,'City Lights',        'Naomi Jackson','Stylized London skyline screen print on velvet paper.',                         180.00, 2022, 'City skyline pop-art',          '18″×24″', 'Screen print',      'No',                           'Numbered 5/100',                          'Tube',                                     FALSE, 'Print'),
(24,'Echoes of Stone',     'Elena Popov','Cracked plaster wall drypoint on Hahnemühle paper.',                             220.00, 2021, 'Urban texture detail',          '14″×18″', 'Drypoint on paper', 'Yes (silver frame)',        'Signed edition 8/30',                     'Flat mailer',                              TRUE,  'Print'),
(25,'Flight Path',         'Aisha Bello','Flock of birds in flight color lithograph on archival paper.',                   210.00, 2023, 'Avian flight',                 '20″×16″', 'Color lithograph',  'No',                           'COA with slipcase',                       'Tube + sleeve',                           FALSE, 'Print'),
(26,'Fragments',           'Viktor Novak','Abstract photographic collage giclée on canvas roll.',                           140.00, 2022, 'Abstract collage',              '24″×24″', 'Giclée on canvas','No',                           'QR-linked certificate',                   'Rolled in tube',                          FALSE, 'Print'),
(27,'Morning Dew',         'Sara Lindgren','Grass blades with dew drops zinc etching on cotton rag paper.',                 230.00, 2020, 'Botanical etching',             '11″×14″', 'Zinc plate etching','Yes (white mat)',           'Artist’s blind stamp',                    'Flat mailer',                              TRUE,  'Print'),
(28,'Retro Remix',         'Diego Ramirez','1950s pop icons collaged in vibrant serigraph on heavy stock.',                  190.00, 2023, 'Retro pop collage',             '22″×28″', 'Screen print',      'No',                           'Numbered 20/75',                          'Tube',                                     FALSE, 'Print'),
(29,'Silent Forest',       'Hiro Tanaka','Pine forest in mist multi-block woodcut on washi paper.',                        250.00, 2018, 'Misty pine forest',             '16″×20″', 'Woodcut on washi','Yes (natural wood frame)',  'Seal and signature in red ink',           'Flat-packed board',                       TRUE,  'Print'),
(30,'Golden Hour',         'Fatima Khan','Stylized desert hills at sunset linocut on archival paper.',                     205.00, 2022, 'Geometric desert landscape',    '18″×18″', 'Linocut on paper', 'No',                           'Numbered 15/40',                          'Tube + waterproof wrap',                  FALSE, 'Print');

-- 1) Add the image_path column
ALTER TABLE artworks
  ADD COLUMN image_path VARCHAR(255) NULL AFTER category;

-- 2) Populate it for artworks 1–30, pointing at your local folder
UPDATE artworks
SET image_path = CONCAT('/it3103a-todo/it3103a-todo/IT3103A-PAINTING CHURVA/images/', artwork_id, '.png')
WHERE artwork_id BETWEEN 1 AND 30;

UPDATE artists
SET profile_picture = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING CHURVA/images/profiles/profile.jpg';

ALTER TABLE payment
ADD COLUMN card_number CHAR(15),
ADD COLUMN card_expiry_month TINYINT,
ADD COLUMN card_expiry_year SMALLINT,
ADD COLUMN card_cvc CHAR(3);

ALTER TABLE payment
ADD COLUMN shipping_address VARCHAR(255) NOT NULL;
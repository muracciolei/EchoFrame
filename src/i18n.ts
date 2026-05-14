import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Visual Memory Space' },
      nav: { canvas: 'Canvas', timeline: 'Timeline', clusters: 'Clusters', settings: 'Settings' },
      actions: { newNode: 'New Memory', search: 'Search memories...', export: 'Export', import: 'Import', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', connect: 'Connect', close: 'Close' },
      node: { title: 'Title', content: 'Write your thoughts...', tags: 'Tags', mood: 'Mood', created: 'Created', connections: 'Connections', noConnections: 'No connections yet' },
      moods: { positive: 'Positive', negative: 'Negative', neutral: 'Neutral', energetic: 'Energetic', calm: 'Calm', reflective: 'Reflective', inspired: 'Inspired', anxious: 'Anxious' },
      timeline: { title: 'Memory Timeline', today: 'Today', thisWeek: 'This Week', thisMonth: 'This Month', older: 'Older' },
      clusters: { title: 'Topic Clusters', auto: 'Auto-generated', custom: 'Custom', expand: 'Expand', collapse: 'Collapse' },
      settings: { title: 'Settings', language: 'Language', theme: 'Theme', animations: 'Animations', data: 'Data Management', about: 'About' },
      onboarding: { welcome: 'Welcome to EchoFrame', description: 'Transform your thoughts into an interactive neural network of memories', getStarted: 'Get Started', skip: 'Skip', step1: 'Create Memories', step1Desc: 'Capture thoughts, ideas, and conversations as visual nodes', step2: 'Connect Ideas', step2Desc: 'Watch as EchoFrame automatically links related memories', step3: 'Explore Space', step3Desc: 'Navigate through your personal knowledge universe' },
      commandPalette: { placeholder: 'Type a command or search...', newNode: 'Create new memory', search: 'Search all memories', export: 'Export all data', import: 'Import data', settings: 'Open settings', timeline: 'Switch to timeline', canvas: 'Switch to canvas' },
      export: { title: 'Export Data', format: 'Format', json: 'JSON (Full data)', success: 'Data exported successfully' },
      import: { title: 'Import Data', select: 'Select file', success: 'Data imported successfully', error: 'Failed to import data' },
      demo: { title: 'Demo Memories', load: 'Load Demo Data' },
      empty: { title: 'No memories yet', description: 'Start creating your first memory by double-clicking on the canvas' },
    },
  },
  es: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Espacio de Memoria Visual' },
      nav: { canvas: 'Lienzo', timeline: 'Linea de Tiempo', clusters: 'Agrupaciones', settings: 'Configuracion' },
      actions: { newNode: 'Nuevo Recuerdo', search: 'Buscar recuerdos...', export: 'Exportar', import: 'Importar', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar', connect: 'Conectar', close: 'Cerrar' },
      node: { title: 'Titulo', content: 'Escribe tus pensamientos...', tags: 'Etiquetas', mood: 'Estado de animo', created: 'Creado', connections: 'Conexiones', noConnections: 'Sin conexiones aun' },
      moods: { positive: 'Positivo', negative: 'Negativo', neutral: 'Neutral', energetic: 'Energetico', calm: 'Calmado', reflective: 'Reflexivo', inspired: 'Inspirado', anxious: 'Ansioso' },
      timeline: { title: 'Linea de Tiempo de Recuerdos', today: 'Hoy', thisWeek: 'Esta Semana', thisMonth: 'Este Mes', older: 'Anteriores' },
      clusters: { title: 'Agrupaciones de Temas', auto: 'Auto-generado', custom: 'Personalizado', expand: 'Expandir', collapse: 'Contraer' },
      settings: { title: 'Configuracion', language: 'Idioma', theme: 'Tema', animations: 'Animaciones', data: 'Gestion de Datos', about: 'Acerca de' },
      onboarding: { welcome: 'Bienvenido a EchoFrame', description: 'Transforma tus pensamientos en una red neuronal interactiva de recuerdos', getStarted: 'Comenzar', skip: 'Omitir', step1: 'Crear Recuerdos', step1Desc: 'Captura pensamientos, ideas y conversaciones como nodos visuales', step2: 'Conectar Ideas', step2Desc: 'Observa como EchoFrame enlaza automaticamente recuerdos relacionados', step3: 'Explorar Espacio', step3Desc: 'Navega por tu universo personal de conocimiento' },
      commandPalette: { placeholder: 'Escribe un comando o busca...', newNode: 'Crear nuevo recuerdo', search: 'Buscar todos los recuerdos', export: 'Exportar todos los datos', import: 'Importar datos', settings: 'Abrir configuracion', timeline: 'Cambiar a linea de tiempo', canvas: 'Cambiar a lienzo' },
      export: { title: 'Exportar Datos', format: 'Formato', json: 'JSON (Datos completos)', success: 'Datos exportados correctamente' },
      import: { title: 'Importar Datos', select: 'Seleccionar archivo', success: 'Datos importados correctamente', error: 'Error al importar datos' },
      demo: { title: 'Recuerdos de Demo', load: 'Cargar Datos de Demo' },
      empty: { title: 'Sin recuerdos aun', description: 'Comienza creando tu primer recuerdo haciendo doble clic en el lienzo' },
    },
  },
  pt: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Espaco de Memoria Visual' },
      nav: { canvas: 'Tela', timeline: 'Linha do Tempo', clusters: 'Agrupamentos', settings: 'Configuracoes' },
      actions: { newNode: 'Nova Memoria', search: 'Pesquisar memorias...', export: 'Exportar', import: 'Importar', save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar', connect: 'Conectar', close: 'Fechar' },
      node: { title: 'Titulo', content: 'Escreva seus pensamentos...', tags: 'Tags', mood: 'Humor', created: 'Criado', connections: 'Conexoes', noConnections: 'Sem conexoes ainda' },
      moods: { positive: 'Positivo', negative: 'Negativo', neutral: 'Neutro', energetic: 'Energetico', calm: 'Calmo', reflective: 'Reflexivo', inspired: 'Inspirado', anxious: 'Ansioso' },
      timeline: { title: 'Linha do Tempo de Memorias', today: 'Hoje', thisWeek: 'Esta Semana', thisMonth: 'Este Mes', older: 'Anteriores' },
      clusters: { title: 'Agrupamentos de Topicos', auto: 'Auto-gerado', custom: 'Personalizado', expand: 'Expandir', collapse: 'Recolher' },
      settings: { title: 'Configuracoes', language: 'Idioma', theme: 'Tema', animations: 'Animacoes', data: 'Gerenciamento de Dados', about: 'Sobre' },
      onboarding: { welcome: 'Bem-vindo ao EchoFrame', description: 'Transforme seus pensamentos em uma rede neural interativa de memorias', getStarted: 'Comecar', skip: 'Pular', step1: 'Criar memorias', step1Desc: 'Capture pensamentos, ideias e conversas como nos visuais', step2: 'Conectar Ideias', step2Desc: 'Observe como o EchoFrame linking automaticamente memorias relacionadas', step3: 'Explorar Espaco', step3Desc: 'Navegue pelo seu universo pessoal de conhecimento' },
      commandPalette: { placeholder: 'Digite um comando ou pesquise...', newNode: 'Criar nova memoria', search: 'Pesquisar todas as memorias', export: 'Exportar todos os dados', import: 'Importar dados', settings: 'Abrir configuracoes', timeline: 'Mudar para linha do tempo', canvas: 'Mudar para tela' },
      export: { title: 'Exportar Dados', format: 'Formato', json: 'JSON (Dados completos)', success: 'Dados exportados com sucesso' },
      import: { title: 'Importar Dados', select: 'Selecionar arquivo', success: 'Dados importados com sucesso', error: 'Falha ao importar dados' },
      demo: { title: 'Memorias Demo', load: 'Carregar Dados Demo' },
      empty: { title: 'Sem memorias ainda', description: 'Comece criando sua primeira memoria clicando duas vezes na tela' },
    },
  },
  fr: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Espace de Memoire Visuel' },
      nav: { canvas: 'Canevas', timeline: 'Chronologie', clusters: 'Regroupements', settings: 'Parametres' },
      actions: { newNode: 'Nouveau Souvenir', search: 'Rechercher des souvenirs...', export: 'Exporter', import: 'Importer', save: 'Sauvegarder', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', connect: 'Connecter', close: 'Fermer' },
      node: { title: 'Titre', content: 'Ecrivez vos pensees...', tags: 'Tags', mood: 'Humeur', created: 'Cree', connections: 'Connexions', noConnections: 'Pas encore de connexions' },
      moods: { positive: 'Positif', negative: 'Negatif', neutral: 'Neutre', energetic: 'Energique', calm: 'Calme', reflective: 'Reflechi', inspired: 'Inspire', anxious: 'Anxieux' },
      timeline: { title: 'Chronologie des Souvenirs', today: "Aujourd'hui", thisWeek: 'Cette Semaine', thisMonth: 'Ce Mois', older: 'Plus Anciens' },
      clusters: { title: 'Regroupements par Sujets', auto: 'Auto-genere', custom: 'Personnalise', expand: 'Developper', collapse: 'Reduire' },
      settings: { title: 'Parametres', language: 'Langue', theme: 'Theme', animations: 'Animations', data: 'Gestion des Donnees', about: 'A Propos' },
      onboarding: { welcome: 'Bienvenue sur EchoFrame', description: 'Transformez vos pensees en un reseau neuronal interactif de souvenirs', getStarted: 'Commencer', skip: 'Passer', step1: 'Creer des Souvenirs', step1Desc: 'Capturez pensees, idees et conversations sous forme de noeuds visuels', step2: 'Connecter les Idees', step2Desc: 'Observez comme EchoFrame lie automatiquement les souvenirs lies', step3: 'Explorer l\'Espace', step3Desc: 'Naviguez dans votre univers personnel de connaissances' },
      commandPalette: { placeholder: 'Tapez une commande ou recherchez...', newNode: 'Creer un nouveau souvenir', search: 'Rechercher tous les souvenirs', export: 'Exporter toutes les donnees', import: 'Importer des donnees', settings: 'Ouvrir les parametres', timeline: 'Basculer vers la chronologie', canvas: 'Basculer vers le canevas' },
      export: { title: 'Exporter les Donnees', format: 'Format', json: 'JSON (Donnees completes)', success: 'Donnees exportees avec succes' },
      import: { title: 'Importer des Donnees', select: 'Selectionner un fichier', success: 'Donnees importees avec succes', error: 'Echec de l\'importation' },
      demo: { title: 'Souvenirs de Demo', load: 'Charger les Donnees de Demo' },
      empty: { title: 'Pas encore de souvenirs', description: 'Commencez par creer votre premier souvenir en double-cliquant sur le canevas' },
    },
  },
  de: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Visueller Erinnerungsraum' },
      nav: { canvas: 'Leinwand', timeline: 'Zeitleiste', clusters: 'Cluster', settings: 'Einstellungen' },
      actions: { newNode: 'Neue Erinnerung', search: 'Erinnerungen suchen...', export: 'Exportieren', import: 'Importieren', save: 'Speichern', cancel: 'Abbrechen', delete: 'Loschen', edit: 'Bearbeiten', connect: 'Verbinden', close: 'Schliessen' },
      node: { title: 'Titel', content: 'Schreibe deine Gedanken...', tags: 'Tags', mood: 'Stimmung', created: 'Erstellt', connections: 'Verbindungen', noConnections: 'Noch keine Verbindungen' },
      moods: { positive: 'Positiv', negative: 'Negativ', neutral: 'Neutral', energetic: 'Energisch', calm: 'Ruhig', reflective: 'Nachdenklich', inspired: 'Inspiriert', anxious: 'Angstlich' },
      timeline: { title: 'Erinnerungs-Zeitleiste', today: 'Heute', thisWeek: 'Diese Woche', thisMonth: 'Dieser Monat', older: 'Alter' },
      clusters: { title: 'Themen-Cluster', auto: 'Auto-generiert', custom: 'Benutzerdefiniert', expand: 'Erweitern', collapse: 'Zusammenklappen' },
      settings: { title: 'Einstellungen', language: 'Sprache', theme: 'Thema', animations: 'Animationen', data: 'Datenverwaltung', about: 'Uber' },
      onboarding: { welcome: 'Willkommen bei EchoFrame', description: 'Verwandle deine Gedanken in ein interaktives neuronales Netz von Erinnerungen', getStarted: 'Loslegen', skip: 'Uberspringen', step1: 'Erinnerungen erstellen', step1Desc: 'Erfasse Gedanken, Ideen und Gesprache als visuelle Knoten', step2: 'Ideen verbinden', step2Desc: 'Beobachte, wie EchoFrame verwandte Erinnerungen automatisch verknupft', step3: 'Raum erkunden', step3Desc: 'Navigiere durch dein personales Wissensuniversum' },
      commandPalette: { placeholder: 'Befehl eingeben oder suchen...', newNode: 'Neue Erinnerung erstellen', search: 'Alle Erinnerungen durchsuchen', export: 'Alle Daten exportieren', import: 'Daten importieren', settings: 'Einstellungen offnen', timeline: 'Zur Zeitleiste wechseln', canvas: 'Zur Leinwand wechseln' },
      export: { title: 'Daten exportieren', format: 'Format', json: 'JSON (Vollstandige Daten)', success: 'Daten erfolgreich exportiert' },
      import: { title: 'Daten importieren', select: 'Datei auswahlen', success: 'Daten erfolgreich importiert', error: 'Import fehlgeschlagen' },
      demo: { title: 'Demo-Erinnerungen', load: 'Demo-Daten laden' },
      empty: { title: 'Noch keine Erinnerungen', description: 'Beginne mit dem Erstellen deiner ersten Erinnerung durch Doppelklick auf die Leinwand' },
    },
  },
  it: {
    translation: {
      app: { title: 'EchoFrame', subtitle: 'Spazio di Memoria Visiva' },
      nav: { canvas: 'Tela', timeline: 'Linea Temporale', clusters: 'Raggruppamenti', settings: 'Impostazioni' },
      actions: { newNode: 'Nuovo Ricordo', search: 'Cerca ricordi...', export: 'Esporta', import: 'Importa', save: 'Salva', cancel: 'Annulla', delete: 'Elimina', edit: 'Modifica', connect: 'Connetti', close: 'Chiudi' },
      node: { title: 'Titolo', content: 'Scrivi i tuoi pensieri...', tags: 'Tag', mood: 'Umore', created: 'Creato', connections: 'Connessioni', noConnections: 'Nessuna connessione ancora' },
      moods: { positive: 'Positivo', negative: 'Negativo', neutral: 'Neutro', energetic: 'Energico', calm: 'Calmo', reflective: 'Riflessivo', inspired: 'Ispirato', anxious: 'Ansioso' },
      timeline: { title: 'Linea Temporale dei Ricordi', today: 'Oggi', thisWeek: 'Questa Settimana', thisMonth: 'Questo Mese', older: 'Piu Vecchi' },
      clusters: { title: 'Raggruppamenti per Topic', auto: 'Auto-generato', custom: 'Personalizzato', expand: 'Espandi', collapse: 'Comprimi' },
      settings: { title: 'Impostazioni', language: 'Lingua', theme: 'Tema', animations: 'Animazioni', data: 'Gestione Dati', about: 'Informazioni' },
      onboarding: { welcome: 'Benvenuto su EchoFrame', description: 'Trasforma i tuoi pensieri in una rete neurale interattiva di ricordi', getStarted: 'Inizia', skip: 'Salta', step1: 'Crea Ricordi', step1Desc: ' Cattura pensieri, idee e conversazioni come nodi visivi', step2: 'Connetti Idee', step2Desc: 'Osserva come EchoFrame collega automaticamente i ricordi correlati', step3: 'Esplora lo Spazio', step3Desc: 'Naviga nel tuo universo personale di conoscenza' },
      commandPalette: { placeholder: 'Digita un comando o cerca...', newNode: 'Crea nuovo ricordo', search: 'Cerca tutti i ricordi', export: 'Esporta tutti i dati', import: 'Importa dati', settings: 'Apri impostazioni', timeline: 'Passa alla linea temporale', canvas: 'Passa alla tela' },
      export: { title: 'Esporta Dati', format: 'Formato', json: 'JSON (Dati completi)', success: 'Dati esportati con successo' },
      import: { title: 'Importa Dati', select: 'Seleziona file', success: 'Dati importati con successo', error: 'Importazione fallita' },
      demo: { title: 'Ricordi Demo', load: 'Carica Dati Demo' },
      empty: { title: 'Nessun ricordo ancora', description: 'Inizia creando il tuo primo ricordo facendo doppio clic sulla tela' },
    },
  },
}

const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('echoframe-language') || 'en' : 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
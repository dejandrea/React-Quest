INSERT INTO public.projects (
  title,
  description,
  technologies,
  status,
  github_url,
  deploy_url
)
VALUES
(
  'Desenho com Gestos',
  'Aplicação que permite desenhar usando movimentos das mãos.',
  ARRAY['Python', 'OpenCV', 'MediaPipe'],
  'Concluído',
  NULL,
  NULL
),
(
  'Detector de Invasores',
  'Jogo com detecção e interação.',
  ARRAY['Python', 'Pygame'],
  'Concluído',
  NULL,
  NULL
),
(
  'React Quest',
  'Plataforma de missões, projetos e evolução Dev.',
  ARRAY['React', 'JavaScript', 'CSS'],
  'Em andamento',
  'https://github.com/profAndreaFranca/React-Quest--Completo',
  NULL
);


INSERT INTO public.missions (
  title,
  description,
  technology,
  difficulty,
  xp,
  completed
)
VALUES
(
  'Criar componente de perfil',
  'Monte um card com informações do desenvolvedor.',
  'React',
  'Fácil',
  50,
  true
),
(
  'Criar a Central de Missões',
  'Exiba missões utilizando componentes.',
  'React',
  'Média',
  100,
  false
),
(
  'Investigar um erro',
  'Encontre e corrija um problema no código.',
  'Debug',
  'Média',
  80,
  false
);

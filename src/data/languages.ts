import { Language, Difficulty, Question } from '../types/quiz';

// ponytail: logo is a path placeholder — drop the real file in src/data/logos/<id>.svg, no code change needed.
export const LANGUAGES: Language[] = [
  { id: 'python', name: 'Python', displayName: 'Python', logo: 'src/data/logos/python.svg', difficulty: 'easy' },
  { id: 'java', name: 'Java', displayName: 'Java', logo: 'src/data/logos/java.svg', difficulty: 'easy' },
  { id: 'javascript', name: 'JavaScript', displayName: 'JavaScript', logo: 'src/data/logos/javascript.svg', difficulty: 'easy' },
  { id: 'typescript', name: 'TypeScript', displayName: 'TypeScript', logo: 'src/data/logos/typescript.svg', difficulty: 'easy' },
  { id: 'c', name: 'C', displayName: 'C', logo: 'src/data/logos/c.svg', difficulty: 'easy' },
  { id: 'cpp', name: 'C++', displayName: 'C++', logo: 'src/data/logos/cpp.svg', difficulty: 'easy' },
  { id: 'csharp', name: 'C#', displayName: 'C#', logo: 'src/data/logos/csharp.svg', difficulty: 'easy' },
  { id: 'rust', name: 'Rust', displayName: 'Rust', logo: 'src/data/logos/rust.svg', difficulty: 'easy' },
  { id: 'go', name: 'Go', displayName: 'Go', logo: 'src/data/logos/go.svg', difficulty: 'easy' },
  { id: 'kotlin', name: 'Kotlin', displayName: 'Kotlin', logo: 'src/data/logos/kotlin.svg', difficulty: 'easy' },
  { id: 'swift', name: 'Swift', displayName: 'Swift', logo: 'src/data/logos/swift.svg', difficulty: 'easy' },
  { id: 'ruby', name: 'Ruby', displayName: 'Ruby', logo: 'src/data/logos/ruby.svg', difficulty: 'easy' },
  { id: 'dart', name: 'Dart', displayName: 'Dart', logo: 'src/data/logos/dart.svg', difficulty: 'easy' },
  { id: 'r', name: 'R', displayName: 'R', logo: 'src/data/logos/r.svg', difficulty: 'easy' },
  { id: 'perl', name: 'Perl', displayName: 'Perl', logo: 'src/data/logos/perl.svg', difficulty: 'medium' },
  { id: 'scala', name: 'Scala', displayName: 'Scala', logo: 'src/data/logos/scala.svg', difficulty: 'medium' },
  { id: 'lua', name: 'Lua', displayName: 'Lua', logo: 'src/data/logos/lua.svg', difficulty: 'medium' },
  { id: 'haskell', name: 'Haskell', displayName: 'Haskell', logo: 'src/data/logos/haskell.svg', difficulty: 'medium' },
  { id: 'django', name: 'Django', displayName: 'Django', logo: 'src/data/logos/django.svg', difficulty: 'easy' },
  { id: 'flask', name: 'Flask', displayName: 'Flask', logo: 'src/data/logos/flask.svg', difficulty: 'easy' },
  { id: 'fastapi', name: 'FastAPI', displayName: 'FastAPI', logo: 'src/data/logos/fastapi.svg', difficulty: 'medium' },
  { id: 'spring', name: 'Spring', displayName: 'Spring', logo: 'src/data/logos/spring.svg', difficulty: 'easy' },
  { id: 'hibernate', name: 'Hibernate', displayName: 'Hibernate', logo: 'src/data/logos/hibernate.svg', difficulty: 'hard' },
  { id: 'quarkus', name: 'Quarkus', displayName: 'Quarkus', logo: 'src/data/logos/quarkus.svg', difficulty: 'hard' },
  { id: 'react', name: 'React', displayName: 'React', logo: 'src/data/logos/react.svg', difficulty: 'easy' },
  { id: 'angular', name: 'Angular', displayName: 'Angular', logo: 'src/data/logos/angular.svg', difficulty: 'easy' },
  { id: 'vuejs', name: 'Vue.js', displayName: 'Vue.js', logo: 'src/data/logos/vuejs.svg', difficulty: 'easy' },
  { id: 'svelte', name: 'Svelte', displayName: 'Svelte', logo: 'src/data/logos/svelte.svg', difficulty: 'medium' },
  { id: 'nextjs', name: 'Next.js', displayName: 'Next.js', logo: 'src/data/logos/nextjs.svg', difficulty: 'easy' },
  { id: 'nuxt', name: 'Nuxt', displayName: 'Nuxt', logo: 'src/data/logos/nuxt.svg', difficulty: 'medium' },
  { id: 'nestjs', name: 'NestJS', displayName: 'NestJS', logo: 'src/data/logos/nestjs.svg', difficulty: 'medium' },
  { id: 'electron', name: 'Electron', displayName: 'Electron', logo: 'src/data/logos/electron.svg', difficulty: 'medium' },
  { id: 'astro', name: 'Astro', displayName: 'Astro', logo: 'src/data/logos/astro.svg', difficulty: 'hard' },
  { id: 'dotnet', name: '.NET', displayName: '.NET', logo: 'src/data/logos/dotnet.svg', difficulty: 'easy' },
  { id: 'blazor', name: 'Blazor', displayName: 'Blazor', logo: 'src/data/logos/blazor.svg', difficulty: 'hard' },
  { id: 'qt', name: 'Qt', displayName: 'Qt', logo: 'src/data/logos/qt.svg', difficulty: 'hard' },
  { id: 'ruby-on-rails', name: 'Ruby on Rails', displayName: 'Ruby on Rails', logo: 'src/data/logos/ruby-on-rails.svg', difficulty: 'easy' },
  { id: 'php', name: 'PHP', displayName: 'PHP', logo: 'src/data/logos/php.svg', difficulty: 'easy' },
  { id: 'laravel', name: 'Laravel', displayName: 'Laravel', logo: 'src/data/logos/laravel.svg', difficulty: 'medium' },
  { id: 'symfony', name: 'Symfony', displayName: 'Symfony', logo: 'src/data/logos/symfony.svg', difficulty: 'hard' },
  { id: 'codeigniter', name: 'CodeIgniter', displayName: 'CodeIgniter', logo: 'src/data/logos/codeigniter.svg', difficulty: 'hard' },
  { id: 'fiber', name: 'Fiber', displayName: 'Fiber', logo: 'src/data/logos/fiber.svg', difficulty: 'hard' },
  { id: 'flutter', name: 'Flutter', displayName: 'Flutter', logo: 'src/data/logos/flutter.svg', difficulty: 'easy' },
  { id: 'akka', name: 'Akka', displayName: 'Akka', logo: 'src/data/logos/akka.svg', difficulty: 'hard' },
  { id: 'ktor', name: 'Ktor', displayName: 'Ktor', logo: 'src/data/logos/ktor.svg', difficulty: 'hard' },
  { id: 'jetpack-compose', name: 'Jetpack Compose', displayName: 'Jetpack Compose', logo: 'src/data/logos/jetpack-compose.svg', difficulty: 'hard' },
  { id: 'mysql', name: 'MySQL', displayName: 'MySQL', logo: 'src/data/logos/mysql.svg', difficulty: 'easy' },
  { id: 'postgresql', name: 'PostgreSQL', displayName: 'PostgreSQL', logo: 'src/data/logos/postgresql.svg', difficulty: 'easy' },
  { id: 'mongodb', name: 'MongoDB', displayName: 'MongoDB', logo: 'src/data/logos/mongodb.svg', difficulty: 'easy' },
  { id: 'redis', name: 'Redis', displayName: 'Redis', logo: 'src/data/logos/redis.svg', difficulty: 'easy' },
  { id: 'sqlite', name: 'SQLite', displayName: 'SQLite', logo: 'src/data/logos/sqlite.svg', difficulty: 'easy' },
  { id: 'mariadb', name: 'MariaDB', displayName: 'MariaDB', logo: 'src/data/logos/mariadb.svg', difficulty: 'medium' },
  { id: 'cassandra', name: 'Cassandra', displayName: 'Cassandra', logo: 'src/data/logos/cassandra.svg', difficulty: 'medium' },
  { id: 'firebase', name: 'Firebase', displayName: 'Firebase', logo: 'src/data/logos/firebase.svg', difficulty: 'easy' },
  { id: 'oracle', name: 'Oracle', displayName: 'Oracle', logo: 'src/data/logos/oracle.svg', difficulty: 'medium' },
  { id: 'git', name: 'Git', displayName: 'Git', logo: 'src/data/logos/git.svg', difficulty: 'easy' },
  { id: 'github', name: 'GitHub', displayName: 'GitHub', logo: 'src/data/logos/github.svg', difficulty: 'easy' },
  { id: 'gitlab', name: 'GitLab', displayName: 'GitLab', logo: 'src/data/logos/gitlab.svg', difficulty: 'medium' },
  { id: 'docker', name: 'Docker', displayName: 'Docker', logo: 'src/data/logos/docker.svg', difficulty: 'easy' },
  { id: 'kubernetes', name: 'Kubernetes', displayName: 'Kubernetes', logo: 'src/data/logos/kubernetes.svg', difficulty: 'medium' },
  { id: 'jenkins', name: 'Jenkins', displayName: 'Jenkins', logo: 'src/data/logos/jenkins.svg', difficulty: 'medium' },
  { id: 'terraform', name: 'Terraform', displayName: 'Terraform', logo: 'src/data/logos/terraform.svg', difficulty: 'medium' },
  { id: 'ansible', name: 'Ansible', displayName: 'Ansible', logo: 'src/data/logos/ansible.svg', difficulty: 'medium' },
  { id: 'nginx', name: 'Nginx', displayName: 'Nginx', logo: 'src/data/logos/nginx.svg', difficulty: 'medium' },
  { id: 'apache', name: 'Apache', displayName: 'Apache', logo: 'src/data/logos/apache.svg', difficulty: 'medium' },
  { id: 'postman', name: 'Postman', displayName: 'Postman', logo: 'src/data/logos/postman.svg', difficulty: 'medium' },
  { id: 'figma', name: 'Figma', displayName: 'Figma', logo: 'src/data/logos/figma.svg', difficulty: 'easy' },
  { id: 'jupyter', name: 'Jupyter', displayName: 'Jupyter', logo: 'src/data/logos/jupyter.svg', difficulty: 'easy' },
  { id: 'visual-studio-code', name: 'Visual Studio Code', displayName: 'Visual Studio Code', logo: 'src/data/logos/visual-studio-code.svg', difficulty: 'easy' },
  { id: 'unity', name: 'Unity', displayName: 'Unity', logo: 'src/data/logos/unity.svg', difficulty: 'easy' },
  { id: 'unreal-engine', name: 'Unreal Engine', displayName: 'Unreal Engine', logo: 'src/data/logos/unreal-engine.svg', difficulty: 'medium' },
  { id: 'godot', name: 'Godot', displayName: 'Godot', logo: 'src/data/logos/godot.svg', difficulty: 'medium' },
  { id: 'numpy', name: 'NumPy', displayName: 'NumPy', logo: 'src/data/logos/numpy.svg', difficulty: 'easy' },
  { id: 'pandas', name: 'Pandas', displayName: 'Pandas', logo: 'src/data/logos/pandas.svg', difficulty: 'easy' },
  { id: 'tensorflow', name: 'TensorFlow', displayName: 'TensorFlow', logo: 'src/data/logos/tensorflow.svg', difficulty: 'easy' },
  { id: 'pytorch', name: 'PyTorch', displayName: 'PyTorch', logo: 'src/data/logos/pytorch.svg', difficulty: 'easy' },
  { id: 'scikit-learn', name: 'Scikit-learn', displayName: 'Scikit-learn', logo: 'src/data/logos/scikit-learn.svg', difficulty: 'hard' },
  { id: 'apache-kafka', name: 'Apache Kafka', displayName: 'Apache Kafka', logo: 'src/data/logos/apache-kafka.svg', difficulty: 'medium' },
  { id: 'apache-spark', name: 'Apache Spark', displayName: 'Apache Spark', logo: 'src/data/logos/apache-spark.svg', difficulty: 'medium' },
  { id: 'apache-airflow', name: 'Apache Airflow', displayName: 'Apache Airflow', logo: 'src/data/logos/apache-airflow.svg', difficulty: 'hard' },
  { id: 'hadoop', name: 'Hadoop', displayName: 'Hadoop', logo: 'src/data/logos/hadoop.svg', difficulty: 'hard' },
  { id: 'grafana', name: 'Grafana', displayName: 'Grafana', logo: 'src/data/logos/grafana.svg', difficulty: 'medium' },
  { id: 'prometheus', name: 'Prometheus', displayName: 'Prometheus', logo: 'src/data/logos/prometheus.svg', difficulty: 'medium' },
  { id: 'elasticsearch', name: 'Elasticsearch', displayName: 'Elasticsearch', logo: 'src/data/logos/elasticsearch.svg', difficulty: 'medium' },
  { id: 'rabbitmq', name: 'RabbitMQ', displayName: 'RabbitMQ', logo: 'src/data/logos/rabbitmq.svg', difficulty: 'medium' },
  { id: 'microsoft-azure', name: 'Microsoft Azure', displayName: 'Microsoft Azure', logo: 'src/data/logos/microsoft-azure.svg', difficulty: 'easy' },
  { id: 'google-cloud', name: 'Google Cloud', displayName: 'Google Cloud', logo: 'src/data/logos/google-cloud.svg', difficulty: 'easy' },
];

// Helper function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Round layout in play order: 5 easy + 5 medium + 5 hard = 15 questions.
export const LEVELS: { level: Difficulty; questions: number; timeLimit: number }[] = [
  { level: 'easy', questions: 5, timeLimit: 10 },
  { level: 'medium', questions: 5, timeLimit: 10 },
  { level: 'hard', questions: 5, timeLimit: 10 },
];

export const TOTAL_ROUNDS = LEVELS.reduce((n, l) => n + l.questions, 0);

// Which tiers may appear as wrong options per level: easy stays pure,
// medium mixes easy in, hard never shows easy logos.
const DISTRACTOR_POOLS: Record<Difficulty, Difficulty[]> = {
  easy: ['easy'],
  medium: ['easy', 'medium'],
  hard: ['medium', 'hard'],
};

/**
 * Builds one full round: easy x5, then medium x5, then hard x5.
 * Targets never repeat within a level; options mix pools per tier.
 */
export function generateRoundDeck(): Question[] {
  const deck: Question[] = [];
  let roundNumber = 0;

  for (const { level, questions: count, timeLimit } of LEVELS) {
    const targets = shuffle(LANGUAGES.filter(l => l.difficulty === level)).slice(0, count);
    const allowed = DISTRACTOR_POOLS[level];

    for (const target of targets) {
      roundNumber += 1;
      const distractors = shuffle(
        LANGUAGES.filter(l => l.id !== target.id && allowed.includes(l.difficulty))
      ).slice(0, 3);
      deck.push({
        id: `q_${roundNumber}_${target.id}`,
        roundNumber,
        level,
        timeLimit,
        targetLanguage: target,
        options: shuffle([target, ...distractors])
      });
    }
  }

  return deck;
}

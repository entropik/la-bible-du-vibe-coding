import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Sparkles, Coffee, Wrench, User, BookOpen,
  Rocket, MessageCircle, Mail, Github, Globe
} from 'lucide-react';

const About = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f23',
      color: '#fff',
      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Header avec retour */}
      <header style={{
        maxWidth: '900px',
        margin: '0 auto 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#a5b4fc',
            textDecoration: 'none',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(165, 180, 252, 0.3)',
            backgroundColor: 'rgba(165, 180, 252, 0.1)',
            fontSize: '14px',
            transition: 'all 0.3s'
          }}
        >
          <ArrowLeft size={18} />
          Retour à l'encyclopédie
        </Link>
      </header>

      {/* Contenu principal */}
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Titre */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            À propos
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px' }}>
            L'histoire derrière La Bible du Vibe Coding
          </p>
        </div>

        {/* Section 1 - Pourquoi */}
        <Section
          icon={<Sparkles size={28} color="#a78bfa" />}
          title="Pourquoi ce site existe"
          color="#a78bfa"
        >
          <p>
            Le "vibe coding", c'est une façon de coder qui ne ressemble plus vraiment à du code.
            C'est discuter avec une IA, poser des idées, affiner, itérer, et voir une application prendre forme beaucoup plus vite qu'avant.
            C'est simple, puissant, parfois un peu déroutant… et surtout, <strong>ça change tout</strong>.
          </p>
          <p>
            J'ai créé <em>La Bible du Vibe Coding</em> parce qu'il manquait un endroit clair, accessible et complet pour comprendre ce nouveau monde :
            les outils, les modèles, les workflows, les bonnes pratiques… sans jargon et sans prise de tête.
          </p>
          <Highlight>
            Si vous débutez, vous êtes au bon endroit.<br/>
            Si vous êtes déjà dev, vous trouverez ici de quoi aller plus vite.<br/>
            Si vous êtes juste curieux : bienvenue aussi.
          </Highlight>
        </Section>

        {/* Section 2 - Histoire */}
        <Section
          icon={<Coffee size={28} color="#f97316" />}
          title="Une histoire de vibes (et de café)"
          color="#f97316"
        >
          <p>
            Soyons transparents : <strong>ce site a été construit en 24 heures</strong>.<br/>
            Pas parce que j'ai des super-pouvoirs — mais parce que je l'ai construit avec les IA.
          </p>
          <p style={{ fontSize: '20px', fontStyle: 'italic', color: '#d1d5db', textAlign: 'center', margin: '24px 0' }}>
            Littéralement.
          </p>
          <p>
            J'ai posé les idées, j'ai discuté, j'ai itéré, et étape après étape, l'interface, la structure, les données, les textes… tout s'est mis en place.
            C'est exactement ça, le vibe coding : <strong>on avance par intentions, pas par lignes de code</strong>.
          </p>
          <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
            Et pour être honnête, personne ne devinerait que ce guide a été imaginé depuis un atelier de campagne bourguignonne,
            entouré de machines d'impression, de piles de papier… et d'un chien qui surveille tout ça de loin.
          </p>
        </Section>

        {/* Section 3 - Qui je suis */}
        <Section
          icon={<User size={28} color="#34d399" />}
          title="Qui je suis"
          color="#34d399"
        >
          <p>
            Je m'appelle <strong>Marc</strong>.<br/>
            Je suis imprimeur, photographe, artisan, geek assumé, et éternel curieux.
          </p>
          <p>
            Je passe mes journées entre de vrais outils (presses, coupeuses, papiers, encres) et des outils numériques (serveurs, IA, apps expérimentales).
            Cette hybridation m'amuse, me nourrit, et parfois me dépasse — mais toujours dans le bon sens.
          </p>
          <p>
            Quand l'IA générative a explosé, j'ai plongé dedans.<br/>
            Quand le vibe coding est arrivé, j'ai compris que ça allait transformer la manière de créer.<br/>
            Et j'ai voulu en faire un guide clair, simple, utile.
          </p>
          <p style={{ color: '#34d399', fontWeight: '500' }}>
            D'où ce site.
          </p>
        </Section>

        {/* Section 4 - Ce que vous trouverez */}
        <Section
          icon={<BookOpen size={28} color="#60a5fa" />}
          title="Ce que vous trouverez ici"
          color="#60a5fa"
        >
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gap: '12px'
          }}>
            {[
              'Des outils pour coder plus vite',
              'Des modèles LLM classés, comparés, expliqués',
              'Des ressources pour apprendre',
              'Une timeline pour comprendre l\'évolution du domaine',
              'Des workflows pour aller du prompt à la production',
              'Une vision simple, sans bullshit, pour démystifier tout ça'
            ].map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}>
                <span style={{ color: '#60a5fa' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '20px', color: '#9ca3af' }}>
            Tout est mis à jour régulièrement, tout est vérifié, tout est pensé pour être compréhensible.
          </p>
        </Section>

        {/* Section 5 - Ce qui arrive */}
        <Section
          icon={<Rocket size={28} color="#f472b6" />}
          title="Ce qui arrive ensuite"
          color="#f472b6"
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {[
              { icon: <Globe size={20} />, text: 'Une version anglaise (biblevibecoding.com)' },
              { icon: <Mail size={20} />, text: 'Une newsletter "les nouveautés du vibe coding"' },
              { icon: <BookOpen size={20} />, text: 'Des guides plus poussés (sécurité, DevOps, bonnes pratiques)' },
              { icon: <Sparkles size={20} />, text: 'Un générateur d\'outils… fait en vibe coding, évidemment' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(244, 114, 182, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(244, 114, 182, 0.2)'
              }}>
                <span style={{ color: '#f472b6' }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '18px', color: '#f472b6' }}>
            Bref : ça ne fait que commencer.
          </p>
        </Section>

        {/* Section 6 - Conclusion */}
        <Section
          icon={<MessageCircle size={28} color="#fbbf24" />}
          title="Un mot de conclusion"
          color="#fbbf24"
        >
          <p>
            Le vibe coding change la façon dont on travaille.<br/>
            Il ouvre la porte à des créateurs, à des développeurs débutants, à des entrepreneurs, à des curieux…
          </p>
          <p>
            L'idée de ce site, c'est de vous accompagner dans cette transition — en douceur, avec clarté, et avec un peu d'humour.
          </p>
          <Highlight color="#fbbf24">
            Bienvenue dans le vibe coding.<br/>
            Installez-vous, explorez, testez, vibez.
          </Highlight>
        </Section>

        {/* Footer */}
        <footer style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <a
              href="https://ooblik.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#a5b4fc',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid rgba(165, 180, 252, 0.3)',
                backgroundColor: 'rgba(165, 180, 252, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <Globe size={18} />
              OOBLIK
            </a>
            <a
              href="https://github.com/entropik/la-bible-du-vibe-coding"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9ca3af',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid rgba(156, 163, 175, 0.3)',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            La Bible du Vibe Coding — Décembre 2025
          </p>
          <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '8px' }}>
            Sur une idée de Marc Tallec — Codé avec Claude Code
          </p>
        </footer>
      </main>
    </div>
  );
};

// Composant Section réutilisable
const Section = ({ icon, title, color, children }) => (
  <section style={{
    marginBottom: '60px',
    padding: '32px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '20px',
    border: `1px solid ${color}22`
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px'
    }}>
      <div style={{
        padding: '12px',
        borderRadius: '12px',
        backgroundColor: `${color}15`
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: color,
        margin: 0
      }}>
        {title}
      </h2>
    </div>
    <div style={{
      color: '#e5e7eb',
      fontSize: '16px',
      lineHeight: '1.8'
    }}>
      {React.Children.map(children, child => {
        if (typeof child === 'string') return child;
        if (child?.type === 'p') {
          return React.cloneElement(child, {
            style: { ...child.props.style, marginBottom: '16px' }
          });
        }
        return child;
      })}
    </div>
  </section>
);

// Composant Highlight
const Highlight = ({ children, color = '#a78bfa' }) => (
  <div style={{
    marginTop: '24px',
    padding: '20px 24px',
    backgroundColor: `${color}10`,
    borderLeft: `4px solid ${color}`,
    borderRadius: '0 12px 12px 0',
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#f3f4f6'
  }}>
    {children}
  </div>
);

export default About;

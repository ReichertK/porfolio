import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';
import { Container } from '../components/Layout/Container';
import { SectionTitle } from '../components/SectionTitle';
import { ContactForm } from '../components/ContactForm';
import { config } from '../config';
import { SEO } from '../seo';

const socialIcons = {
  github: { icon: FiGithub, label: 'GitHub' },
  linkedin: { icon: FiLinkedin, label: 'LinkedIn' },
  twitter: { icon: FiTwitter, label: 'Twitter' },
  website: { icon: FiGlobe, label: 'Sitio Web' }
};

export function Contact() {
  return (
    <>
      <SEO 
        title="Contacto" 
        description="Ponte en contacto conmigo para colaborar en proyectos o intercambiar ideas"
      />
      
      <Container className="py-20">
        <SectionTitle 
          title="Contacto" 
          subtitle="¿Tienes una idea interesante? Me encanta colaborar en proyectos innovadores"
          centered 
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <FiMail className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-400">Respuesta rápida garantizada</p>
                </div>
              </div>
              <a
                href={`mailto:${config.email}`}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {config.email}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Redes Sociales
              </h3>
              <div className="space-y-4">
                {Object.entries(config.social).map(([platform, url]) => {
                  if (!url) return null;
                  
                  const socialConfig = socialIcons[platform as keyof typeof socialIcons];
                  if (!socialConfig) return null;

                  const { icon: Icon, label } = socialConfig;

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                      <span>{label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-emerald-600/20 rounded-lg">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Ubicación</h3>
                  <p className="text-gray-400">Disponible para trabajo remoto</p>
                </div>
              </div>
              <p className="text-gray-300">{config.location}</p>
            </motion.div>

            {/* Collaboration Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Tipos de Colaboración
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Desarrollo de aplicaciones web</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Proyectos open source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Consultoría técnica</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Mentoring y code review</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center card p-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            ¿Listo para crear algo increíble juntos?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            No importa si tienes una idea específica o solo quieres explorar posibilidades. 
            Me encanta discutir proyectos interesantes y encontrar soluciones creativas.
          </p>
          <a
            href={`mailto:${config.email}?subject=Colaboración - Portafolio`}
            className="btn-primary"
          >
            Enviar Email Directo
          </a>
        </motion.div>
      </Container>
    </>
  );
}
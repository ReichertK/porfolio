import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Container } from '../components/Layout/Container';
import { SEO } from '../seo';

export function Home() {
  return (
    <>
      <SEO />
      <div className="relative">
        <Container>
          <Hero />
        </Container>

        {/* Brief explanation cards */}
        <Container className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Skills Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Habilidades Dinámicas
              </h3>
              <p className="text-gray-400">
                Mis habilidades se detectan automáticamente analizando mis repositorios de GitHub, 
                mostrando las tecnologías que realmente uso.
              </p>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Proyectos Reales
              </h3>
              <p className="text-gray-400">
                Explora mis proyectos públicos directamente desde GitHub, 
                con filtros y búsqueda para encontrar lo que te interese.
              </p>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Colaboremos
              </h3>
              <p className="text-gray-400">
                ¿Tienes una idea interesante? Me encanta colaborar en proyectos 
                innovadores y desafiantes.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
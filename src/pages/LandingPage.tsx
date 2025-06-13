
import { motion } from "framer-motion";
import { BookOpen, RefreshCw, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-primary/30 to-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              IMPROVING DOMAIN-SPECIFIC AI EDUCATION
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A structured approach to design domain-specific AI courses
              and help teachers to bring AI education into their respective domain.
            </p>
            <Button
              size="lg"
              onClick={handleExplore}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto"
            >
              Explore Canvases
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Open</h3>
              <p className="text-muted-foreground">Accessible educational resources for all learners and educators.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Living</h3>
              <p className="text-muted-foreground">Continuously updated with the latest AI advancements and techniques.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Gem className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impactful</h3>
              <p className="text-muted-foreground">Designed to create meaningful learning outcomes and practical skills.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split section */}
      {/* Split section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First motion div */}
            <div className="flex flex-col justify-center p-6 md:p-10 bg-slate-800 rounded-xl text-white">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">FREELY AVAILABLE TO EVERYONE</h2>
                <p className="text-slate-300 mb-6">
                  The AI Course Design Planning Framework can be downloaded by anyone free of charge
                  and can be used for their own projects, whether in research, education or beyond
                  (CC BY-SA 4.0 license).
                </p>

              </motion.div>
            </div>

            {/* Second motion div */}
            <div className="flex flex-col justify-center p-6 md:p-10 bg-slate-800 rounded-xl text-white">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">A LIVING PROJECT</h2>
                <p className="text-slate-300 mb-6">
                  The development of the AI Course Design Planning Framework is a continuous process. It is regularly re-evaluated and improved by the latest scientific findings.
                </p>

              </motion.div>
            </div>
          </div>

          {/* Third motion div centered below */}
          <div className="flex justify-center mt-8">
            <div className="flex flex-col justify-center p-6 md:p-10 bg-slate-800 rounded-xl text-white w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">INTERDISCIPLINARY COLLABORATION</h2>
                <p className="text-slate-300 mb-6">
                  The AI Course Design Planning Framework builds an interdisciplinary bridge between computer science education and other academic fields (“domains”). It is applicable in every domain of higher education.
                </p>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/*Last section*/}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            STRUCTURE OF THE AI COURSE DESIGN PLANNING FRAMEWORK
          </h1>
          <p className="text-center mb-12 text-lg">
            The framework is divided into three pillars: AI in the Domain (left), Learning Environment (middle), and Course Implementation (right). Taken together, these pillars reflect the key aspects for developing and implementing an AI course.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {/* <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg> */}
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg> */}
                <h2 className="text-2xl font-bold">AI USECASES IN THE DOMAIN</h2>
              </div>
              <p className="text-indigo-200">
                Impact of AI on the domain, today as well as in the future. Well-established or cutting-edge AI use cases in the domain.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <h2 className="text-2xl font-bold">DATA IN THE DOMAIN</h2>
              </div>
              <p className="text-indigo-200">
                Most common data types in the domain.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-2xl font-bold">IMPLICATIONS OF USING AI IN THE DOMAIN</h2>
              </div>
              <p className="text-indigo-200">
                Important legal, ethical and social implications of using AI in the domain.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-1c0-2.21-1.79-4-4-4H12zm0 8c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
                </svg>
                <h2 className="text-2xl font-bold">ADDITIONAL LEARNING RESOURCES</h2>
              </div>
              <p className="text-indigo-200">
                Additional resources that can be used to teach AI in the domain, such as open educational resources.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h2 className="text-2xl font-bold">LEARNERS AND THEIR INTERACTION WITH AI</h2>
              </div>
              <p className="text-indigo-200">
                Learners’ pre-existing knowledge and skills and the role that learners will take after completing the course.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-bold">INSTRUCTORS</h2>
              </div>
              <p className="text-indigo-200">
                AI knowledge, skills, and competencies of all course instructors and organizers.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold">INTERNAL SUPPORT</h2>
              </div>
              <p className="text-indigo-200">
                Internal resources such as available data, time, and money. Support from the university
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.094-.133-2.158-.382-3.182z" />
                </svg>
                <h2 className="text-2xl font-bold">LEARNING OUTCOMES</h2>
              </div>
              <p className="text-indigo-200">
                Knowledge and skills that participants should have upon completion of the course.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-2xl font-bold">ASSESSMENT</h2>
              </div>
              <p className="text-indigo-200">
                Methods with which the achievement of the learning outcomes will be evaluated.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <h2 className="text-2xl font-bold">LEARNING ACTIVITIES</h2>
              </div>
              <p className="text-indigo-200">
                Actual activities that will be used to teach AI to the participants.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

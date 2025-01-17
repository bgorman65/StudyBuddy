import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";


// Background component
const Background = () => {
    const [init, setInit] = useState(false);
  
    // Initialize the particles
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        })
        .then(() => {
            setInit(true);
        });
    }, []);


    // Function to check if the particles are loaded
    const particlesLoaded = (container) => {
        console.log(container);
    };


    // Options for the particles
    const options = useMemo(
        () => ({
        background: {
            color: {
            value: "#0000",
            },
        },
        fpsLimit: 30,
        interactivity: {
            events: {
            onClick: {
                enable: true,
                mode: "repulse",
            },
            onHover: {
                enable: true,
                mode: 'grab',
            },
            },
            modes: {
            push: {
                distance: 200,
                duration: 15,
            },
            grab: {
                distance: 150,
            },
            },
        },
        particles: {
            color: {
            value: "#ffffff",
            },
            links: {
            color: "#FFFFFF",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            },
            move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
            },
            number: {
            density: {
                enable: true,
            },
            value: 150,
            },
            opacity: {
            value: 1.0,
            },
            shape: {
            type: "circle",
            },
            size: {
            value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
        }),
        [],
    );


    // Construct the particles
    return (
        <Particles init={particlesLoaded} options={options} />
    ); 
};

export default Background;
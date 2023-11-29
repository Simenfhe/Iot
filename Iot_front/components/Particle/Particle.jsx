import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import React from 'react';
import { useCallback } from 'react';


const RoomParticles = ({ id, speed, intensity }) => {
    console.log(intensity)
    console.log(speed)
    console.log(id)

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);
    return (
        <Particles
            id={`particles-${id}`}
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    enable: false
                },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#378805",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: speed,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: intensity,
                        },
                        value: 30,
                    },
                    opacity: {
                        value: 1,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 5, max: 15 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default RoomParticles;
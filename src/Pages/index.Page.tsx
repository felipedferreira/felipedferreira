import React, { FC, useEffect, createRef } from 'react'
import { config } from './../Assets/particleJs.config'
import { Page } from './../Components/Navigation'
import DownloadDocument from './../Assets/Doge.png'

export const HomePage:FC = ({}) => {

    const expericeTech = [
		'Typescript',
		'React',
		'Angular',
		'NodeJs',
		'SQL Server',
		'MongoDb',
		'Docker',
		'Web Components',
		'IIS',
		'NginX',
		'Authentication/OAuth2.0'
    ]

    const scrollElement = createRef<HTMLDivElement>()

    const part1 = createRef<HTMLDivElement>()
    const part2 = createRef<HTMLDivElement>()
    const part3 = createRef<HTMLDivElement>()

    const getConfig = () => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        const color = isDarkMode ? "#ffffff" : "#000000"
        config.particles.color.value=color
        config.particles.line_linked.color=color
        return config
    }


    const changeFunction = () => {
        window.particlesJS("particles-js", getConfig())
    }

    useEffect(function onLoad() {
        window.particlesJS("particles-js", getConfig())
        const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
        prefersColorScheme.addEventListener('change', changeFunction)
            return () => {
                prefersColorScheme.removeEventListener('change', changeFunction)
            }
        },
    [])


    const scrollTo = (page: Page):void => {
        let element: HTMLDivElement
        switch (page) {
            case Page.intro:
                element = part1.current
                break;
            case Page.contact:
                element = part2.current
                break;
            case Page.experience:
                element = part3.current            
                break;        
        }
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }


    return <div id="scrollElement" ref={scrollElement} className="col flexed stretched" style={{position:"relative", overflow: 'auto'}}>
            <div className="background full-dim stretched slightBlur" id="particles-js" style={{position:"absolute"}}></div>
            <div className="full-dim">

                <div ref={part1} id="intro" className="flexed flex-center col title full-dim">
                    <div className="contact-wrapper">
                        <h1 className="centered-text">Felipe Ferreira</h1>
                        <h2>Write something here about me</h2>
                        <div onClick={() => scrollTo(Page.experience)}>Scroll down to Bottom...</div>
                    </div>
                </div>

                <div ref={part2} id="contact" className="flexed flex-center col title full-dim">
                    <div className="contact-wrapper">
                        <h1 className="centered-text">Contact Me</h1>
                        <div className="fields">
                            <div className="field-wrap flexed">
                                <input className="stretched" type="text" placeholder="name" />
                            </div>
                            <div className="field-wrap flexed">
                                <input className="stretched" type="text" placeholder="email" />
                            </div>
                            <div className="field-wrap flexed">
                                <textarea placeholder="Write your message here" className="stretched"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={part3} id="experience" className="flexed flex-center col title full-dim">
                    <div className="contact-wrapper">
                        <h1 className="centered-text">Experience</h1>
                        {expericeTech.map(tech => <div className="centered-text" key={tech}>{tech}</div>)}
                        <a href={DownloadDocument} download>Download Doge</a>
                    </div>
                </div>


            </div>
    </div>
}
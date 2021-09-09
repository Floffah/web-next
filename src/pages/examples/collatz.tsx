import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import NavBar from "../../components/navigation/NavBar/NavBar";

export default function CollatzConjecturePage() {
    const [data, setData] = useState<[number, number[], string, string][]>([]);
    const [maxSteps, setMaxSteps] = useState(0);
    const [colours, setColours] = useState<string[]>([]);

    const maxStepsArray: string[] = [];

    for (let i = 0; i <= maxSteps; i++) maxStepsArray.push(`${i}`);

    const getSteps = (number: number) => {
        const steps: number[] = [number];
        let lastStep = number;

        while (lastStep !== 1) {
            if (lastStep % 2 === 0) {
                lastStep = lastStep / 2;
            } else {
                lastStep = 3 * lastStep + 1;
            }
            steps.push(lastStep);
        }

        return steps;
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const lastsSteps = getSteps(data.length + 1);
            setData([
                ...data,
                [
                    data.length + 1,
                    lastsSteps,
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                ],
            ]);

            setColours([
                ...colours,
                "#" + Math.floor(Math.random() * 16777215).toString(16),
            ]);

            if (lastsSteps.length > maxSteps) setMaxSteps(lastsSteps.length);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [data, maxSteps, colours]);

    return (
        <>
            <NextSeo title="Collatz Conjecture Graph" />
            <NavBar forceBackground={false} />
            <Line
                data={{
                    labels: maxStepsArray,
                    datasets: data.map((e) => ({
                        label: `${e[0]}`,
                        data: e[1],
                        borderColor: e[2],
                        backgroundColor: e[3],
                        animation: false,
                    })),
                }}
                options={{
                    responsive: true,
                }}
            />
        </>
    );
}

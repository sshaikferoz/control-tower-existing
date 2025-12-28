import React, { useRef, useEffect, useState } from 'react';
import CircularGauge, {
    Geometry,
    Scale,
    Label,
    ValueIndicator,
    RangeContainer,
    SubvalueIndicator,
    Range,
} from 'devextreme-react/circular-gauge';
import styles from './SustainabilityGauge.module.css';

const SustainabilityGauge = ({ score = 100, industryAvg = 61 }) => {
    const innerGaugeRef = useRef(null);
    const [bubbleAngle, setBubbleAngle] = useState(0);
    const startAngle = 225;
    const endAngle = 315;
    const sweep = endAngle - startAngle;

    const safeScore = Math.max(0, Math.min(100, score));

    // Calculate angle for inner gauge pointer (sustainability score)
    const innerGaugeAngle = startAngle + (safeScore / 100) * sweep;



    // Calculate angle for industry average position
    const industryAvgAngle = startAngle + (industryAvg / 100) * sweep;
    const industryAvgAngleRad = (industryAvgAngle * Math.PI) / 180;

    // Calculate position for tooltip at the pointer
    // Gauge center is at 50% left, approximately 58% from top (matching centerBubble)
    // Container is 300px wide, 260px tall
    const gaugeCenterX = 150; // 50% of 300px
    const gaugeCenterY = 150; // approximate center (58% of 260px ≈ 150px)
    const gaugeRadius = 142; // 0.95 * 150px (outer gauge radius)
    const pointerOffset = 10; // offset of the triangle marker
    const pointerRadius = gaugeRadius + pointerOffset; // actual pointer position
    const tooltipOffset = 8; // distance from the pointer

    // Calculate point on the gauge where the pointer is located
    const pointerX = gaugeCenterX + pointerRadius * Math.cos(industryAvgAngleRad);
    const pointerY = gaugeCenterY + pointerRadius * Math.sin(industryAvgAngleRad);

    // Position tooltip near the pointer, offset outward from the gauge
    const tooltipX = gaugeCenterX + (pointerRadius + tooltipOffset) * Math.cos(industryAvgAngleRad);
    const tooltipY = gaugeCenterY + (pointerRadius + tooltipOffset) * Math.sin(industryAvgAngleRad);

    const customizeText = ({ valueText }) => {
        return `${valueText} %`;
    }


    return (


        <div className={styles.container}>

            {/* ===== OUTER GAUGE : Industry Avg ===== */}
            <div className={styles.outerGaugeWrapper}>
                <CircularGauge
                    className={styles.outerGauge}
                    value={industryAvg}
                >
                    <Geometry
                        startAngle={225}
                        endAngle={315}
                        radius={0.95}
                    />

                    <Scale
                        startValue={0}
                        endValue={100}
                        scaleDivisionFactor={20}
                        tick={{
                            visible: true,
                            length: 18,
                            width: 0.8,
                            color: '#30499f'
                        }}
                    >
                        <Label visible={false} useRangeColors={true} customizeText={customizeText} />
                    </Scale>

                    <RangeContainer width={20}>
                        <Range startValue={0} endValue={industryAvg} color="#00a3e0" />
                        <Range startValue={industryAvg} endValue={100} color="#335caa" />
                    </RangeContainer>

                    <ValueIndicator
                        type="triangleMarker"
                        color="#00a3e0"
                        offset={-19}
                    />
                </CircularGauge>
            </div>

            {/* ===== INNER GAUGE : Sustainability (Ranges) ===== */}
            <CircularGauge
                ref={innerGaugeRef}
                className={styles.innerGauge}
                value={score}
            >
                <Geometry
                    startAngle={225}
                    endAngle={315}
                    radius={0.75}
                />

                <Scale startValue={0} endValue={100} tick={{ visible: false }}>
                    <Label visible={false} />
                </Scale>

                <RangeContainer width={12}>
                    {/* 0-50: Red with gradient transitioning to Orange */}
                    <Range startValue={0} endValue={25} color="#E53935" />
                    <Range startValue={25} endValue={37.5} color="#F4511E" />
                    <Range startValue={37.5} endValue={50} color="#FF6B35" />
                    {/* 51-60: Orange with gradient transitioning to Yellow */}
                    <Range startValue={51} endValue={55.5} color="#FF6B35" />
                    <Range startValue={55.5} endValue={60} color="#FF8F00" />
                    {/* 61-75: Yellow with gradient transitioning to Yellowish Green */}
                    <Range startValue={61} endValue={68} color="#FFA726" />
                    <Range startValue={68} endValue={75} color="#AED581" />
                    {/* 76-85: Yellowish Green with gradient transitioning to Green */}
                    <Range startValue={76} endValue={80.5} color="#9CCC65" />
                    <Range startValue={80.5} endValue={85} color="#81C784" />
                    {/* 86-100: Green with slight gradient */}
                    <Range startValue={86} endValue={93} color="#66BB6A" />
                    <Range startValue={93} endValue={100} color="#4CAF50" />
                </RangeContainer>

                <ValueIndicator
                    type="triangleMarker"
                    color="#ffffff"
                    offset={10}

                />
            </CircularGauge>

            {/* ===== CENTER BUBBLE ===== */}
            <div
                className={styles.centerBubble}
                style={{ '--bubble-rotation': `${bubbleAngle}deg` }}
            >
                <div className={styles.centerContent}>
                    <div className={styles.centerScore}>{score}</div>
                    <div className={styles.centerSubtitle}>
                        Saudi Aramco
                        <br />
                        Avg. sustainability score
                    </div>
                </div>
            </div>

            {/* ===== INDUSTRY AVERAGE TOOLTIP AT POINTER ===== */}
            <div
                className={styles.industryTooltip}
                style={{
                    top: `${tooltipY}px`,
                    left: `${tooltipX}px`,
                }}
            >
                <div className={styles.industryTooltipContent}>
                    Industry Avg. score <span className={styles.industryValue}>{industryAvg}</span>
                </div>
            </div>

            {/* ===== BOTTOM LABELS ===== */}
            <div className={styles.bottomLabels}>
                <div className={styles.bottomLabel}>0</div>
                <div className={styles.bottomLabel}>100</div>
            </div>
        </div>
    );
};

export default SustainabilityGauge;

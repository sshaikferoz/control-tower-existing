const DarkStyles = () => (
  <style jsx>{`
    :root {
      --gradient-block-top: 38, 40, 51;
      --gradient-block-bottom: 31, 34, 43;
      --bg-rgb: 28, 31, 38;
      --bg: rgb(var(--bg-rgb));
      --block-bg: linear-gradient(
        to bottom,
        rgb(var(--gradient-block-top)) 0%,
        rgb(var(--gradient-block-bottom)) 100%
      );
      --block-rgb: 255, 255, 255;
      --block-color: rgb(var(--rgb-card));
      --bg-top: rgb(43 17 89);
      --bg-bottom: rgb(43 17 89);
      --sh-glow: 0 0 10px rgba(255, 255, 255, 0.6),
        0px 0px 20px rgba(255, 255, 255, 0.6);
      --block-title-color: #ffffff;
      --inv-accent1: #e27343;
      --inv-accent2: #7e8dd5;
      --inv-accent3: #b3b3b3;
      --inv-accent4: #1b4b95;
      --inv-accent5: #344267;
      --inv-accent6: #626af9;
      --proc-accent1: #b0f1d7;
      --proc-accent2: #a56bf5;
      --proc-accent3: #4d4d4d;
      --proc-accent4: #3b3257;
      --proc-text1: #c8c6d0;
      --wh-accent1: #ffd8bb;
      --wh-accent2: #7e8dd5;
      --wh-accent3: #4d4d4d;
      --wh-accent4: #808080;
      --wh-accent5: #cccccc;
      --wh-accent6: #ffffff;
      --lg-accent1: #ffc846;
      --lg-accent2: #bebebe;
      --kpi-color: #ffffff;
      --kpiGreen: #3ab54a;
      --kpiRed: #dc3447;
      --kpiYellow: #ebdc58;
      --sh-title: 5px 4px 2px #333;

      /* spaces
 */
      --space-xxs: 0.25rem;
      --space-xs: 0.5rem;
      --space-sm: 1rem;
      --space-md: 1.5rem;
      --space-lg: 2rem;
      --space-xl: 3rem;
      --space-xxl: 6rem;
      font-size: 15px;

      /* font sizes
  */
      --font-sm: 0.8rem;
      --font-md: 1rem;
      --font-lg: 1.5rem;
      --font-xl: 2rem;
    }

    * {
      box-sizing: border-box;
      margin: 0;
    }

    p {
      margin: 0;
    }

    body {
      background-color: var(--bg);
      font-family: 'Poppins', system-ui, 'Trebuchet MS', 'Lucida Sans Unicode',
        'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }

    .flexStack {
      display: flex;
      align-items: center;
      gap: 0.5em;
      justify-content: center;
    }
    .gap2 {
      gap: 2em;
    }

    .chart {
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }

    .block {
      background-image: var(--block-bg);
      border-radius: 10px;
      color: var(--block-color);
      padding: var(--space-sm);
      display: grid;
      grid-template-rows: max-content 1fr;
      height: 100%;
      box-shadow: 0 0 6px rgba(18, 18, 18, 0.7);
    }

    .blockTitle {
      margin: 0;
      text-align: center;
      text-transform: capitalize;
      font-size: 1.1rem;
      font-weight: 300;
      color: var(--block-title-color);
    }

    .wrapper {
      display: grid;
      grid-template-rows: 95px 1fr;
      height: 100vh;
      padding: var(--space-sm);
      padding-top: 0;
    }

    .zeroPaddingRight {
      padding-right: 0;
    }
    .zeroPaddingLeft {
      padding-left: 0;
    }

    .progressBar .dx-progressbar-range {
      border: 3px solid var(--proc-accent2);
      background-color: var(--proc-accent2);
    }
  `}</style>
)

export default DarkStyles
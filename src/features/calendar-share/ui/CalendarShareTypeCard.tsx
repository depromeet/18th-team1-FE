const TodayText = (): React.ReactElement => (
  <svg
    role="img"
    aria-label="오늘의 문장 카드"
    width="92"
    height="111"
    viewBox="0 0 92 111"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#ttc-filter0)">
      <rect x="7.38477" y="6.89209" width="76.7825" height="88.1979" rx="8" fill="white" />
      <rect
        x="7.88477"
        y="7.39209"
        width="75.7825"
        height="87.1979"
        rx="7.5"
        stroke="#787880"
        strokeOpacity="0.16"
      />
      <path
        d="M38.6823 37.4912C39.5417 37.4912 40.0261 37.835 40.3229 38.6396L48.737 61.2881C48.9401 61.835 48.9245 62.3037 48.7136 62.7334C48.4636 63.2256 47.9714 63.4912 47.2761 63.4912L45.2761 63.4912C44.4089 63.4912 43.862 63.1084 43.5651 62.2959L41.6823 57.1475L31.5026 57.1475L29.6198 62.2959C29.3151 63.1084 28.7682 63.4912 27.9011 63.4912L25.9011 63.4912C25.2057 63.4912 24.7136 63.2256 24.4714 62.7334C24.2526 62.3037 24.2448 61.835 24.4479 61.2881L32.8542 38.6396C33.1511 37.835 33.6432 37.4912 34.4948 37.4912L38.6823 37.4912ZM33.2839 52.2881L39.9011 52.2881L36.5886 43.249L33.2839 52.2881ZM57.8704 44.0537C63.6907 44.0537 65.6751 47.0615 65.6751 50.6787L65.6751 57.46C65.6751 58.7725 65.7454 60.5225 65.9017 61.8896C66.0032 62.8428 65.4486 63.4912 64.4876 63.4912L62.6907 63.4912C61.9017 63.4912 61.3626 63.0459 61.222 62.3271C60.2611 63.1709 58.8157 63.835 56.6439 63.835C52.5345 63.835 49.2376 61.4053 49.2376 57.4209C49.2376 53.8037 51.9173 52.2256 55.6751 52.0693L60.3079 51.8584C60.5579 51.8428 60.6673 51.7881 60.7064 51.6162L60.7064 50.9053C60.7064 49.335 59.8782 48.5303 57.8626 48.5303C55.8939 48.5303 55.1282 49.3115 55.0111 50.249C54.9173 50.96 54.6361 51.4131 53.6595 51.4131L51.5345 51.4131C50.6204 51.4131 50.0267 50.8818 49.9954 49.9521C49.9251 47.1631 51.972 44.0537 57.8704 44.0537ZM54.3001 57.5537C54.3001 58.8896 55.5423 59.71 57.222 59.71C59.1595 59.71 60.7064 58.7334 60.7064 56.1084L60.7064 55.499C60.3704 55.5928 59.9954 55.6475 59.5657 55.6787L56.7064 55.874C55.0111 55.9834 54.3001 56.4834 54.3001 57.5537Z"
        fill="#8A8A8A"
      />
    </g>
    <defs>
      <filter
        id="ttc-filter0"
        x="0.000150204"
        y="-0.000217885"
        width="91.7976"
        height="103.213"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.492308" />
        <feGaussianBlur stdDeviation="3.69231" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const Calendar = (): React.ReactElement => (
  <svg
    role="img"
    aria-label="캘린더 카드"
    width="92"
    height="111"
    viewBox="0 0 92 111"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#cc-filter0)">
      <g clipPath="url(#cc-clip0)">
        <rect
          x="7.50781"
          y="7.01514"
          width="76.7825"
          height="88.1979"
          rx="8"
          fill="#A4D4D6"
          shapeRendering="crispEdges"
        />
        <rect
          width="76.7825"
          height="14.9449"
          transform="translate(7.50781 7.01514)"
          fill="#6B1E3C"
        />
        <g clipPath="url(#cc-clip1)">
          <rect
            width="76.7825"
            height="60.5344"
            transform="translate(7.50781 21.96)"
            fill="white"
          />
          <path
            d="M39.0364 67.4951C33.9164 67.4951 30.0764 63.8151 30.0764 59.0151V58.5351C30.0764 58.0951 30.4364 57.7351 30.8764 57.7351H33.9964C34.4364 57.7351 34.7964 58.0951 34.7964 58.5351V59.0151C34.7964 61.2551 36.4764 63.0551 39.0364 63.0551C41.6764 63.0551 43.1964 61.1751 43.1964 58.7751C43.1964 56.6151 41.8364 54.7351 39.0364 54.7351H38.3564C37.9164 54.7351 37.5564 54.3751 37.5564 53.9351V51.0951C37.5564 50.6551 37.9164 50.2951 38.3564 50.2951H39.0364C41.3564 50.2951 42.7164 48.6551 42.7164 46.5751C42.7164 44.6551 41.5164 42.9751 39.0364 42.9751C36.5964 42.9751 35.2764 44.7351 35.2764 46.4951V46.8951C35.2764 47.3351 34.9164 47.6951 34.4764 47.6951H31.3564C30.9164 47.6951 30.5564 47.3351 30.5564 46.8951V46.4951C30.5564 41.8551 34.1564 38.5351 39.0364 38.5351C44.1564 38.5351 47.4764 41.8151 47.4764 46.5351C47.4764 48.5751 46.6764 50.5751 45.2364 52.0151C44.9564 52.2551 44.9164 52.6151 45.2364 52.8551C46.9964 54.2551 47.9564 56.5351 47.9564 58.9351C47.9564 63.8551 44.1564 67.4951 39.0364 67.4951ZM58.0855 67.0151C57.6455 67.0151 57.2855 66.6551 57.2855 66.2151V45.9751C57.2855 45.5351 56.8455 45.4551 56.5655 45.6951L51.8055 49.8551C51.3655 50.2551 50.4455 50.0951 50.4455 49.2151V46.3351C50.4455 45.7351 50.4855 45.2951 51.0055 44.8151L56.6855 39.6551C57.0455 39.3351 57.5655 39.0151 58.1255 39.0151H61.1655C61.6055 39.0151 61.9655 39.3751 61.9655 39.8151V66.2151C61.9655 66.6551 61.6055 67.0151 61.1655 67.0151H58.0855Z"
            fill="#8A8A8A"
          />
        </g>
        <rect
          width="76.7825"
          height="2.95385"
          transform="translate(7.50781 82.4946)"
          fill="#AB9D44"
        />
      </g>
      <rect
        x="7.50781"
        y="7.01514"
        width="76.7825"
        height="88.1979"
        rx="8"
        stroke="#787880"
        strokeOpacity="0.16"
        strokeWidth="0.246154"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="cc-filter0"
        x="0.000150204"
        y="-0.000217885"
        width="91.7976"
        height="103.213"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.492308" />
        <feGaussianBlur stdDeviation="3.69231" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <clipPath id="cc-clip0">
        <rect x="7.50781" y="7.01514" width="76.7825" height="88.1979" rx="8" fill="white" />
      </clipPath>
      <clipPath id="cc-clip1">
        <rect width="76.7825" height="60.5344" fill="white" transform="translate(7.50781 21.96)" />
      </clipPath>
    </defs>
  </svg>
);

const SelectText = (): React.ReactElement => (
  <svg
    role="img"
    aria-label="문장 선택 카드"
    width="88"
    height="120"
    viewBox="0 0 88 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#stc-filter0)">
      <g clipPath="url(#stc-clip0)">
        <rect
          x="8.31152"
          y="7.76562"
          width="70.8466"
          height="103"
          rx="8"
          fill="#A4D4D6"
          shapeRendering="crispEdges"
        />
        <rect x="8.31152" y="7.76562" width="5.72235" height="103" fill="url(#stc-paint0)" />
        <rect x="11.3086" y="7.76514" width="2.17989" height="103" fill="url(#stc-paint1)" />
        <rect opacity="0.5" x="23.3115" y="24.6514" width="44" height="14" rx="4" fill="white" />
      </g>
      <rect
        x="8.31152"
        y="7.76562"
        width="70.8466"
        height="103"
        rx="8"
        stroke="#787880"
        strokeOpacity="0.16"
        strokeWidth="0.272487"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="stc-filter0"
        x="0.000201225"
        y="-0.000235379"
        width="87.4683"
        height="119.622"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.544974" />
        <feGaussianBlur stdDeviation="4.0873" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient
        id="stc-paint0"
        x1="14.0339"
        y1="59.2656"
        x2="8.31152"
        y2="59.2656"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5A5A5A" stopOpacity="0.3" />
        <stop offset="0.456731" stopColor="#5A5A5A" stopOpacity="0" />
        <stop offset="0.591346" stopColor="#5A5A5A" stopOpacity="0" />
        <stop offset="1" stopColor="#5A5A5A" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient
        id="stc-paint1"
        x1="13.4885"
        y1="59.2651"
        x2="11.3086"
        y2="59.2651"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.225962" stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" stopOpacity="0.3" />
      </linearGradient>
      <clipPath id="stc-clip0">
        <rect x="8.31152" y="7.76562" width="70.8466" height="103" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export { Calendar, SelectText, TodayText };

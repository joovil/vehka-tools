import { Ellipse, Path, Rect, Svg } from "@react-pdf/renderer";

const HeaderSvg = () => {
  return (
    <Svg style={{ position: "absolute" }}>
      <Rect
        y="-6"
        width="595"
        height="281"
        fill="#E83C6A"
      />

      <Ellipse
        cx="297.5"
        cy="441.5"
        rx="564.5"
        ry="198.5"
        fill="white"
      />
      <Path
        d="M379.345 140.488L376.309 132.151H361.488L358.451 140.488H350.938L364.936 104H373.17L387.065 140.488H379.345ZM368.898 111.874L363.855 125.666H373.942L368.898 111.874Z"
        fill="white"
      />
      <Path
        d="M336.618 140.488L326.017 125.357L321.488 130.349V140.488H314.386V104H321.488V120.52L336.103 104H345.418L330.957 119.902L345.521 140.488H336.618Z"
        fill="white"
      />
      <Path
        d="M306.75 140.488H299.596V125.357H283.694V140.488H276.592V104H283.694V118.667H299.596V104H306.75V140.488Z"
        fill="white"
      />
      <Path
        d="M268.885 140.488H246.035V104H268.885V110.69H253.137V119.027H267.393V125.357H253.137V133.798H268.885V140.488Z"
        fill="white"
      />
      <Path
        d="M224.292 131.121L233.813 104H241.326L227.791 140.488H220.483L207 104H214.771L224.292 131.121Z"
        fill="white"
      />
      <Path
        d="M163 64V180H433V64H163ZM421.177 168.773H174.823V75.2267H421.177V168.773Z"
        fill="white"
      />
    </Svg>
  );
};

export default HeaderSvg;

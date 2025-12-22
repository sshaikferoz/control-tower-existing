export function getArgumentField(
  chartData,
  option = { textHint: null, orderHint: null, strict: false }
) {
  const { textHint, orderHint, strict } = option;
  if (!chartData || !Array.isArray(chartData) || chartData?.lenght === 0)
    return null;
  const [firstItem] = chartData;
  if (typeof firstItem !== "object") return null;
  const keys = Object.keys(firstItem);
  console.log({ keys });

  // hint string value provided ==> get first key that matches hint
  if (
    typeof textHint === "string" &&
    textHint.length &&
    keys.find((i) => i.match(new RegExp(textHint, "i")))
  )
    return keys.find((i) => i.match(new RegExp(textHint, "i")));

  //hint number value n provided ==> get the nth found
  if (typeof orderHint === "number") {
    if (keys.find((i, ind) => !i.startsWith("VALUE0") && orderHint === ind))
      return keys.find((i, ind) => !i.startsWith("VALUE0") && orderHint === ind);
  }
  //no hint provided
  if (strict !== true) return keys.find((item) => !item.startsWith("VALUE0"));
}

export const transitionViewIfSupported = (updateCb) => {
  setTimeout(async () => {
    await new Promise((r) => setTimeout(r, 30));
    if (document?.startViewTransition) {
      document?.startViewTransition(updateCb);
    } else {
      updateCb();
    }
  });
};

export const getEncodedVariable = (
  varValue,
  queryTechname = "YPDO_CT_SUPPLIER_LIST",
  varTechname = "YX_SCVEN"
) => {
  if (Array.isArray(varValue)) {
    const combined = varValue
      .map((value, ind) => {
        const var_template = `VAR_NAME_${ind}=${varTechname}`;
        const value_template = `VAR_VALUE_EXT_${ind}=${value || ""}`;
        const operator_template = `VAR_OPERATOR_${ind}=EQ`;
        const string = `${var_template}&${operator_template}&${value_template}`;
        return string;
      })
      .join("&");
    return `${queryTechname}&variables=${encodeURIComponent(combined)}`;
  }
};

export function formatNumber(number, digits = 0) {
  if (isNaN(number)) return number;
  const num = Math.abs(Number(number));
  return new Number(num || 0).toLocaleString("en-US", {
    maximumFractionDigits: digits,
    compactDisplay: "short",
  });
}

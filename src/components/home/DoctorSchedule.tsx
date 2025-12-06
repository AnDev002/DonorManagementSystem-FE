"use client";
import React from "react";
import Image from "next/image";

// --- Sub-components (Giữ nguyên logic style) ---

const Component1 = ({ prop8, prop3 }: { prop8: string; prop3: string }) => (
  <div
    style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "28px",
      whiteSpace: "nowrap",
      color: "rgba(0,0,0,1)",
      lineHeight: "24px",
      fontWeight: "400",
      minWidth: prop3,
    }}
  >
    {prop8}
  </div>
);

const Component3 = ({ prop28, prop23 }: { prop28: string; prop23: string }) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "32px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        whiteSpace: "nowrap",
        color: "rgba(102,102,102,1)",
        lineHeight: "100%",
        fontWeight: "400",
        minWidth: prop23,
      }}
    >
      {prop28}
    </div>
  </div>
);

const Component4 = ({
  prop46,
  prop41,
  prop43,
}: {
  prop46: string;
  prop41: string;
  prop43: boolean;
}) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        width: "36px",
        height: "36px",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          whiteSpace: "nowrap",
          lineHeight: "100%",
          fontWeight: "400",
          minWidth: prop41,
          color: prop43 ? "rgba(170,170,170,1)" : "rgba(51,51,51,1)",
        }}
      >
        {prop46}
      </div>
    </div>
  </div>
);

const Component5 = ({ prop64, prop59 }: { prop64: string; prop59: string }) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        width: "36px",
        height: "36px",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          whiteSpace: "nowrap",
          color: "rgba(51,51,51,1)",
          lineHeight: "100%",
          fontWeight: "400",
          minWidth: prop59,
        }}
      >
        {prop64}
      </div>
    </div>
  </div>
);

const Component6 = ({
  prop73,
  prop74,
  prop75,
  prop76,
  prop77,
  prop78,
  prop79,
  prop89,
  prop84,
  prop86,
}: any) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        borderRadius: "18px",
        width: "36px",
        height: "36px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...(prop73 && { borderColor: "rgb(51,122,247)" }),
        ...(prop74 && { borderTopWidth: "1px" }),
        ...(prop75 && { borderBottomWidth: "1px" }),
        ...(prop76 && { borderLeftWidth: "1px" }),
        ...(prop77 && { borderRightWidth: "1px" }),
        ...(prop78 && { borderStyle: "solid" }),
        ...(prop79 && { borderWidth: "1px" }),
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          whiteSpace: "nowrap",
          lineHeight: "100%",
          fontWeight: "400",
          minWidth: prop84 ? "16px" : "15px",
          color: prop86 ? "rgba(51,122,247,1)" : "rgba(51,51,51,1)",
        }}
      >
        {prop89}
      </div>
    </div>
  </div>
);

const Component7 = ({
  prop107,
  prop102,
}: {
  prop107: string;
  prop102: string;
}) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        width: "36px",
        height: "36px",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          whiteSpace: "nowrap",
          color: "rgba(51,51,51,1)",
          lineHeight: "100%",
          fontWeight: "400",
          minWidth: prop102,
        }}
      >
        {prop107}
      </div>
    </div>
  </div>
);

const Component8 = ({
  prop125,
  prop120,
  prop122,
}: {
  prop125: string;
  prop120: string;
  prop122: boolean;
}) => (
  <div
    style={{
      borderColor: "rgb(224,224,224)",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      width: "48px",
      height: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        width: "36px",
        height: "36px",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          whiteSpace: "nowrap",
          lineHeight: "100%",
          fontWeight: "400",
          minWidth: prop120,
          color: prop122 ? "rgba(51,51,51,1)" : "rgba(170,170,170,1)",
        }}
      >
        {prop125}
      </div>
    </div>
  </div>
);

// --- Data ---

const data1 = [
  { dataField1: "ID: 123456", dataField2: "144px" },
  { dataField1: "Name: Le Thuy Trang", dataField2: "284px" },
  { dataField1: "Birthday: 11/04/2004", dataField2: "279px" },
  { dataField1: "Countryside: Ha Tinh", dataField2: "279px" },
];

const data2 = [
  { dataField3: "Su", dataField4: "15px" },
  { dataField3: "Mo", dataField4: "18px" },
  { dataField3: "Tu", dataField4: "14px" },
  { dataField3: "We", dataField4: "18px" },
  { dataField3: "Th", dataField4: "15px" },
  { dataField3: "Tr", dataField4: "12px" },
  { dataField3: "Sa", dataField4: "15px" },
];

const data3 = [
  { dataField5: "30", dataField6: "18px", dataField7: true },
  { dataField5: "31", dataField6: "16px", dataField7: true },
  { dataField5: "1", dataField6: "7px", dataField7: false },
  { dataField5: "2", dataField6: "9px", dataField7: false },
  { dataField5: "3", dataField6: "9px", dataField7: false },
  { dataField5: "4", dataField6: "9px", dataField7: false },
  { dataField5: "5", dataField6: "9px", dataField7: false },
];

const data4 = [
  { dataField8: "6", dataField9: "9px" },
  { dataField8: "7", dataField9: "8px" },
  { dataField8: "8", dataField9: "9px" },
  { dataField8: "9", dataField9: "9px" },
  { dataField8: "10", dataField9: "16px" },
  { dataField8: "11", dataField9: "14px" },
  { dataField8: "12", dataField9: "15px" },
];

const data5 = [
  {
    dataField10: true,
    dataField11: true,
    dataField12: true,
    dataField13: true,
    dataField14: true,
    dataField15: true,
    dataField16: true,
    dataField17: "13",
    dataField18: true,
    dataField19: true,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "14",
    dataField18: true,
    dataField19: false,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "15",
    dataField18: true,
    dataField19: false,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "16",
    dataField18: true,
    dataField19: false,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "17",
    dataField18: false,
    dataField19: false,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "18",
    dataField18: true,
    dataField19: false,
  },
  {
    dataField10: false,
    dataField11: false,
    dataField12: false,
    dataField13: false,
    dataField14: false,
    dataField15: false,
    dataField16: false,
    dataField17: "19",
    dataField18: true,
    dataField19: false,
  },
];

const data6 = [
  { dataField20: "20", dataField21: "18px" },
  { dataField20: "21", dataField21: "15px" },
  { dataField20: "22", dataField21: "17px" },
  { dataField20: "23", dataField21: "18px" },
  { dataField20: "24", dataField21: "18px" },
  { dataField20: "25", dataField21: "17px" },
  { dataField20: "26", dataField21: "18px" },
];

const data7 = [
  { dataField22: "27", dataField23: "17px", dataField24: true },
  { dataField22: "28", dataField23: "18px", dataField24: true },
  { dataField22: "29", dataField23: "18px", dataField24: true },
  { dataField22: "30", dataField23: "18px", dataField24: true },
  { dataField22: "1", dataField23: "7px", dataField24: false },
  { dataField22: "2", dataField23: "9px", dataField24: false },
  { dataField22: "3", dataField23: "9px", dataField24: false },
];

// --- Main Component ---

const DoctorSchedule = () => (
  // Thêm wrapper flex-center để căn giữa trang
  <div className="flex justify-center w-full py-10 overflow-x-auto">
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "233px",
        width: "1376px",
        height: "356px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: "12px",
          width: "785px",
          height: "339px",
          boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          paddingTop: "32.2px",
          paddingLeft: "54px",
        }}
      >
        <div
          style={{
            transform: "rotate(0deg)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "32px",
            minWidth: "397.1px",
            whiteSpace: "nowrap",
            color: "rgba(0,0,0,1)",
            lineHeight: "24px",
            fontWeight: "700",
          }}
        >
          Medical Staff Information
        </div>
        <div style={{ marginTop: "11.2px" }}>
          <Image
            width={677}
            height={4} // Chỉnh lại height thành số nguyên
            src="/assets/SvgAsset4.svg"
            alt="Svg Asset 4"
          />
        </div>
        <div
          style={{
            marginTop: "23.5px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "140px",
            width: "638px",
            height: "207px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "214px",
              height: "207px",
            }}
          >
            <div
              style={{ position: "relative", width: "214px", height: "183px" }}
            >
              <Image
                style={{ position: "absolute", zIndex: "20" }}
                width={214}
                height={183}
                src="/assets/SvgAsset2.svg"
                alt="Svg Asset 2"
              />
              <Image
                style={{ position: "absolute", zIndex: "10" }}
                width={214}
                height={177}
                src="/assets/SvgAsset3.svg"
                alt="Svg Asset 3"
              />
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                whiteSpace: "nowrap",
                color: "rgba(0,0,255,1)",
                lineHeight: "24px",
                fontWeight: "500",
              }}
            >
              See more
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "28px",
              width: "284px",
              height: "180px",
            }}
          >
            {data1.map(({ dataField1, dataField2 }, index) => (
              <Component1 key={index} prop8={dataField1} prop3={dataField2} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "relative", width: "358px", height: "341px" }}>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: "12px",
            width: "358px",
            height: "339px",
            boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.25)",
            position: "absolute",
            top: "2px",
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "15px",
            paddingBottom: "5px",
            gap: "44px",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "32px",
              whiteSpace: "nowrap",
              color: "rgba(0,0,0,1)",
              lineHeight: "100%",
              fontWeight: "700",
            }}
          >
            Work schedule
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "348px",
              height: "251px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "30.2px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data2.map(({ dataField3, dataField4 }, index) => (
                <Component3
                  key={index}
                  prop28={dataField3}
                  prop23={dataField4}
                />
              ))}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "44.3px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data3.map(({ dataField5, dataField6, dataField7 }, index) => (
                <Component4
                  key={index}
                  prop46={dataField5}
                  prop41={dataField6}
                  prop43={dataField7}
                />
              ))}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "44.3px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data4.map(({ dataField8, dataField9 }, index) => (
                <Component5 key={index} prop64={dataField8} prop59={dataField9} />
              ))}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "44.3px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data5.map(
                (
                  {
                    dataField10,
                    dataField11,
                    dataField12,
                    dataField13,
                    dataField14,
                    dataField15,
                    dataField16,
                    dataField17,
                    dataField18,
                    dataField19,
                  },
                  index
                ) => (
                  <Component6
                    key={index}
                    prop73={dataField10}
                    prop74={dataField11}
                    prop75={dataField12}
                    prop76={dataField13}
                    prop77={dataField14}
                    prop78={dataField15}
                    prop79={dataField16}
                    prop89={dataField17}
                    prop84={dataField18}
                    prop86={dataField19}
                  />
                )
              )}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "44.3px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data6.map(({ dataField20, dataField21 }, index) => (
                <Component7
                  key={index}
                  prop107={dataField20}
                  prop102={dataField21}
                />
              ))}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "12px",
                width: "348px",
                height: "44.3px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {data7.map(({ dataField22, dataField23, dataField24 }, index) => (
                <Component8
                  key={index}
                  prop125={dataField22}
                  prop120={dataField23}
                  prop122={dataField24}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "86px",
            zIndex: "10",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50px",
            height: "100px",
          }}
        >
          <Image
            width={31} // Làm tròn từ 30.7px
            height={53}
            src="/assets/SvgAsset1.svg"
            alt="Svg Asset 1"
          />
        </div>
      </div>
    </div>
  </div>
);

export default DoctorSchedule;
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { SectionHeader } from "../../components/SectionHeader";

export function PackageShowcase({ packages, styles, loading }) {
  const [activeStyle, setActiveStyle] = useState("");

  const filteredPackages = useMemo(() => {
    if (!activeStyle) return packages;
    return packages.filter((item) => item.styles?.includes(activeStyle));
  }, [packages, activeStyle]);

  function getStyleName(styleId) {
    return styles.find((s) => s.id === styleId)?.name || styleId;
  }

  return (
    <section className="section" id="packages">
      <SectionHeader
        eyebrow="套餐展示"
        title="按拍摄场景选择服务"
        description="套餐信息由后端接口返回，前端只负责展示和交互。"
      />
      <div className="filter-bar">
        <button
          className={`style-chip ${!activeStyle ? "active" : ""}`}
          onClick={() => setActiveStyle("")}
          type="button"
        >
          全部
        </button>
        {styles.map((style) => (
          <button
            className={`style-chip ${activeStyle === style.id ? "active" : ""}`}
            key={style.id}
            onClick={() => setActiveStyle(style.id)}
            type="button"
          >
            {style.name}
          </button>
        ))}
      </div>
      <div className="package-grid">
        {loading
          ? [1, 2, 3].map((item) => <div className="card skeleton" key={item} />)
          : filteredPackages.map((item) => (
              <article className="card package-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="card-body">
                  <div className="package-title">
                    <h3>{item.name}</h3>
                    <strong>¥{item.price}</strong>
                  </div>
                  <p>{item.duration}</p>
                  <div className="style-tags">
                    {item.styles?.map((styleId) => (
                      <span className="style-tag" key={styleId}>
                        {getStyleName(styleId)}
                      </span>
                    ))}
                  </div>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle2 size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}

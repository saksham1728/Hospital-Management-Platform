import React, { useEffect } from 'react';

const StopRapingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="stop-violence-page">
      <div className="hero-section" style={{marginTop:"5.5rem"}}>
        <h1>Promoting Women's Safety</h1>
        <p>
          Ensuring women's safety is not just a matter of law, but of human dignity and respect. It is essential to foster an environment where every woman feels safe, protected, and empowered. To create lasting change, we must address the root causes and work together toward a safer society.
        </p>
      </div>

      <div className="content-section">
        <div className="impact-section">
          <h2>The Importance of Women's Safety</h2>
          <p>
            Protecting women from harm is crucial to their well-being and the overall health of society. Women face numerous challenges related to safety, including:
          </p>
          <ul>
            <li><strong>Emotional Impact:</strong> Experiencing harassment or violence can lead to long-lasting emotional distress, including anxiety and fear.</li>
            <li><strong>Social Pressure:</strong> Women often face judgment or are silenced when they raise concerns about their safety, making it harder to seek help.</li>
            <li><strong>Physical Harm:</strong> The risk of injury and long-term physical effects are serious concerns that many women deal with daily.</li>
            <li><strong>Barriers to Freedom:</strong> Concerns about safety can limit women’s freedom, mobility, and access to opportunities.</li>
          </ul>
        </div>

        <div className="awareness-section">
          <h2>Raising Awareness for Change</h2>
          <p>
            Raising awareness is key to preventing violence and ensuring that women feel supported and safe. It can:
          </p>
          <ul>
            <li><strong>Empower Communities:</strong> Educating individuals about respectful behavior and women’s rights helps foster safer environments.</li>
            <li><strong>Shift Perspectives:</strong> Awareness campaigns can challenge harmful attitudes and promote respect and equality.</li>
            <li><strong>Support Preventative Actions:</strong> Knowledge and awareness lead to stronger policies and more effective community programs.</li>
          </ul>
        </div>

        <div className="action-section">
          <h2>What You Can Do</h2>
          <p>
            Every person plays a role in creating a safer society for women. Here are a few ways you can contribute:
          </p>
          <ul>
            <li><strong>Stay Informed:</strong> Learn about the issues surrounding women’s safety and share that knowledge to promote positive change.</li>
            <li><strong>Support Women:</strong> Listen to and believe women when they share their experiences, and help connect them to resources.</li>
            <li><strong>Advocate for Justice:</strong> Speak up for policies and laws that protect women and create safer communities.</li>
            <li><strong>Challenge Stereotypes:</strong> Combat myths and stereotypes that downplay the importance of women's safety.</li>
            <li><strong>Create Safe Spaces:</strong> Ensure that homes, workplaces, and public areas are safe for women to speak up and seek help.</li>
          </ul>
        </div>

        <div className="resources-section">
          <h2>Support Resources for Women</h2>
          <p>
            If you or someone you know needs assistance, there are many resources available to provide support and guidance:
          </p>
          <ul>
            <li><a href="https://www.womenshealth.gov/" target="_blank" rel="noopener noreferrer">Women's Health</a> - Information and support on women's health and safety.</li>
            <li><a href="https://www.unwomen.org/en" target="_blank" rel="noopener noreferrer">UN Women</a> - A global organization working for women's rights and empowerment.</li>
            <li><a href="https://www.domesticshelters.org/" target="_blank" rel="noopener noreferrer">Domestic Shelters</a> - Find nearby shelters and resources for women in need.</li>
          </ul>
        </div>
      </div>

      <div className="call-to-action">
        <h2>Be Part of the Solution</h2>
        <p>
          Protecting women’s safety requires a collective effort. By learning, supporting, and advocating, you can make a meaningful difference. Join the movement to build a world where every woman feels safe and empowered.
        </p>
        <a href="#top" className="back-to-top">Back to Top</a>
      </div>
    </div>
  );
};

export default StopRapingPage;

import React, { useState } from 'react';
import './Reserve.css';

const orgs = [
  {
    id: 1,
    name: "XYZ donor org.",
    location: "Motijhil, Dhaka",
    phone: "+8801234567890",
    donationType: "Paid donation",
    cost: "0,000/- BDT",
    rating: 5,
    successCount: 0,
    bloodTypes: [
      { type: "O+", details: "Plasma 10 bag, RBC 15 bag, WBC 15 bag, Platelet 25 bag, Regular 35 bag", color: "green" },
    ],
    recentUpdate: "12:35 pm, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 2,
    name: "ABC Blood Bank",
    location: "Dhanmondi, Dhaka",
    phone: "+8801987654321",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 4,
    successCount: 20,
    bloodTypes: [
      { type: "B+", details: "Plasma 8 bag, RBC 12 bag", color: "green" },
      { type: "AB-", details: "Plasma 5 bag, Platelet 10 bag", color: "blue" }
    ],
    recentUpdate: "11:00 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  },
  {
    id: 3,
    name: "Green Crescent Org",
    location: "Mirpur, Dhaka",
    phone: "+8801300000003",
    donationType: "Paid donation",
    cost: "1,500/- BDT",
    rating: 5,
    successCount: 15,
    bloodTypes: [
      { type: "AB+", details: "Plasma 6 bag, RBC 10 bag", color: "green" },
      { type: "O-", details: "Plasma 5 bag, Platelet 12 bag", color: "blue" }
    ],
    recentUpdate: "10:15 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 4,
    name: "Hope Blood Center",
    location: "Gulshan, Dhaka",
    phone: "+8801300000004",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 3,
    successCount: 12,
    bloodTypes: [
      { type: "A+", details: "Plasma 7 bag, RBC 9 bag", color: "green" },
      { type: "B-", details: "Plasma 4 bag, Platelet 6 bag", color: "blue" }
    ],
    recentUpdate: "09:00 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  },
  {
    id: 5,
    name: "Life Savers Org",
    location: "Banani, Dhaka",
    phone: "+8801300000005",
    donationType: "Paid donation",
    cost: "1,200/- BDT",
    rating: 4,
    successCount: 25,
    bloodTypes: [
      { type: "O+", details: "Plasma 15 bag, RBC 20 bag", color: "green" },
      { type: "AB-", details: "Plasma 8 bag, Platelet 10 bag", color: "blue" }
    ],
    recentUpdate: "08:45 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 6,
    name: "Red Cross Dhaka",
    location: "Uttara, Dhaka",
    phone: "+8801300000006",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 5,
    successCount: 40,
    bloodTypes: [
      { type: "B+", details: "Plasma 10 bag, RBC 12 bag", color: "green" },
      { type: "O-", details: "Plasma 6 bag, Platelet 15 bag", color: "blue" }
    ],
    recentUpdate: "08:00 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  },
  {
    id: 7,
    name: "Bright Blood Org",
    location: "Tejgaon, Dhaka",
    phone: "+8801300000007",
    donationType: "Paid donation",
    cost: "1,800/- BDT",
    rating: 3,
    successCount: 5,
    bloodTypes: [
      { type: "A-", details: "Plasma 4 bag, RBC 8 bag", color: "green" },
      { type: "B-", details: "Plasma 3 bag, Platelet 7 bag", color: "blue" }
    ],
    recentUpdate: "07:30 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 8,
    name: "Hope Life Center",
    location: "Mohammadpur, Dhaka",
    phone: "+8801300000008",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 4,
    successCount: 30,
    bloodTypes: [
      { type: "AB+", details: "Plasma 12 bag, RBC 15 bag", color: "green" },
      { type: "O+", details: "Plasma 10 bag, Platelet 15 bag", color: "blue" }
    ],
    recentUpdate: "07:00 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  },
  {
    id: 9,
    name: "Lifespring Org",
    location: "Mirpur, Dhaka",
    phone: "+8801300000009",
    donationType: "Paid donation",
    cost: "1,300/- BDT",
    rating: 5,
    successCount: 10,
    bloodTypes: [
      { type: "O-", details: "Plasma 5 bag, RBC 7 bag", color: "green" },
      { type: "A+", details: "Plasma 8 bag, Platelet 12 bag", color: "blue" }
    ],
    recentUpdate: "06:30 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 10,
    name: "Safe Blood Bank",
    location: "Gulshan, Dhaka",
    phone: "+8801300000010",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 4,
    successCount: 50,
    bloodTypes: [
      { type: "B+", details: "Plasma 10 bag, RBC 14 bag", color: "green" },
      { type: "AB-", details: "Plasma 6 bag, Platelet 11 bag", color: "blue" }
    ],
    recentUpdate: "06:00 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  },
  {
    id: 11,
    name: "Care Plus Org",
    location: "Mirpur, Dhaka",
    phone: "+8801300000011",
    donationType: "Paid donation",
    cost: "1,700/- BDT",
    rating: 4,
    successCount: 8,
    bloodTypes: [
      { type: "A+", details: "Plasma 9 bag, RBC 13 bag", color: "green" },
      { type: "B-", details: "Plasma 7 bag, Platelet 9 bag", color: "blue" }
    ],
    recentUpdate: "05:45 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: true
  },
  {
    id: 12,
    name: "Helping Hands",
    location: "Banani, Dhaka",
    phone: "+8801300000012",
    donationType: "Voluntary donation",
    cost: "Free",
    rating: 5,
    successCount: 60,
    bloodTypes: [
      { type: "O+", details: "Plasma 11 bag, RBC 14 bag", color: "green" },
      { type: "AB+", details: "Plasma 7 bag, Platelet 10 bag", color: "blue" }
    ],
    recentUpdate: "05:15 am, today",
    city: "Dhaka, Bangladesh",
    includeTransportCost: false
  }
];

const Badge = ({ type, color }) => {
  const bgColors = {
    green: "#4caf50",
    blue: "#2196f3",
  };
  return (
    <div className={`badge ${color}`} style={{
      backgroundColor: bgColors[color] || "#ccc",
      color: "white",
      padding: "0.4rem 0.8rem",
      borderRadius: "8px",
      fontWeight: "600",
      marginBottom: "0.3rem",
      whiteSpace: "nowrap"
    }}>
      Available {type}
    </div>
  );
};

export default function Reserve() {
  const [contactVisible, setContactVisible] = useState({});

  const toggleContact = (id) => {
    setContactVisible(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="reserve-container" style={{ padding: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="reserve-scroll" style={{ display: "flex", overflowX: "auto", gap: "1rem", paddingBottom: "1rem" }}>
        {orgs.map(org => (
          <div key={org.id} className="reserve-card" style={{
            minWidth: 320,
            background: "#fafafa",
            borderRadius: "12px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            padding: "1rem",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ margin: 0 }}>{org.name}</h3>
              <p style={{ fontWeight: "600", margin: "0.2rem 0" }}>{org.location}</p>
              <p><strong>{org.donationType}</strong> &nbsp;&nbsp; {org.cost}</p>
              <p>{"⭐".repeat(org.rating)} · {org.successCount} successfully donated</p>
              <hr style={{ margin: "0.8rem 0" }} />
              <div style={{ display: "flex", gap: "0.8rem", overflowX: "auto", marginTop: "0.8rem" }}>
                {org.bloodTypes.map(bt => (
                  <div key={bt.type} style={{
                    minWidth: 130,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "0.6rem",
                    flexShrink: 0
                  }}>
                    <Badge type={bt.type} color={bt.color} />
                    <small>{bt.details}</small>
                  </div>
                ))}
              </div>
            </div>
            <hr style={{ margin: "0.8rem 0" }} />
            <p><strong>Recent update:</strong> {org.recentUpdate} {org.city}</p>
            {org.includeTransportCost && (
              <>
                <p>📌 Include transport cost</p>
                <p>📌 Include transport cost</p>
              </>
            )}
            <button
              className="reserve-contact-button"
              onClick={() => toggleContact(org.id)}
              style={{
                marginTop: "1rem",
                padding: "0.6rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              {contactVisible[org.id] ? "Hide Contact" : "Contact"}
            </button>
            {contactVisible[org.id] && (
              <p style={{ marginTop: "0.5rem", fontWeight: "600" }}>{org.phone}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

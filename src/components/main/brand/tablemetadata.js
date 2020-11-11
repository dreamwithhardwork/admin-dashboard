const columns = [
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button onClick={() => {
              const { data } = this.state;
              data.shift();
              this.setState({ data });
            }}>
              Delete
            </button>
          );
        }
      }
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
              Edit
            </button>
          );
        }
      }
    },
    {
      name: "Name",
      options: {
        filter: true,
      }
    },
    {
      label: "Modified Title Label",
      name: "Title",
      options: {
        filter: true,
      }
    },
    {
      name: "Location",
      options: {
        filter: false,
      }
    },
    {
      name: "Age",
      options: {
        filter: true,
      }
    },
    {
      name: "Salary",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "Add",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button onClick={() => {
              const { data } = this.state;
              data.unshift(["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]);
              this.setState({ data });
            }}>
              Add
            </button>
          );
        }
      }
    },
  ];
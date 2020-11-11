import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@frontity/connect";
import { Html2React } from "../../src/libraries/component";
import link from "../link";
import Html2ReactPackage from "../../src";

const store = createStore(Html2ReactPackage);
store.libraries.html2react.processors.push(link);

jest.mock("@frontity/components/link", () => "mocked-link");

describe("Link Processor", () => {
  it("should replace all anchor tags with links", () => {
    const { container } = render(
      <Html2React
        html="<a href='http://my-link.com/post-name'>My Link</a><a href='http://my-link.com/post-name'>My Link 2</a>"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should not replace anchor tags starting with #", () => {
    const { container } = render(
      <Html2React
        html="<a href='#id'>My Link</a><a href='http://my-link.com/post-name'>My Link 2</a>"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
